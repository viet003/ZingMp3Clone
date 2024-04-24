import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArrSlider } from '../../utils/fn'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom'

const SectionSliderBanner = () => {

    const { banner } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // ainimation for banner
    useEffect(() => {
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0
        let max = 2
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1)
            for (let i = 0; i < sliderEls.length; i++) {
                // Delete classnames (css)
                sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20')
                sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10')
                sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10')

                // Hide or Show images
                if (list.some(item => item === i)) {
                    sliderEls[i].style.cssText = `display: block`
                } else {
                    sliderEls[i].style.cssText = `display: none`
                }
            }
            // Add animation by adding classnames
            list.forEach(item => {
                if (item === max) {
                    sliderEls[item]?.classList?.add('animate-slide-right', 'order-last', 'z-20')
                } else if (item === min) {
                    sliderEls[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10')
                } else {
                    sliderEls[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-10')
                }
            })
            min = (min === sliderEls.length - 1) ? 0 : min + 1
            max = (max === sliderEls.length - 1) ? 0 : max + 1
        }, 10000)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])

    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.setPlay(true))
        } else if (item?.type === 4) {
            const albumPath = item?.link?.split('.')[0]
            // console.log(albumPath)
            navigate(albumPath)
        }
        // console.log(item)
    }

    return (
        <div className='w-full'>
            <div className='flex w-full gap-8'>
                {banner?.map((item, index) => (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        onClick={() => handleClickBanner(item)}
                        className={`slider-item w-[30%] flex-1 object-contain rounded-lg ${index <= 2 ? 'block' : 'hidden'} cursor-pointer`}
                    />
                ))}
            </div>
        </div>
    )
}

export default SectionSliderBanner