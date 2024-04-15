import React, { memo } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Audio } from "../components"

const List = ({ songData }) => {

    const dispatch = useDispatch()
    const { curSongId, isPlaying } = useSelector(state => state.music)
    // console.log(songData);
    return (
        <div className='grid grid-cols-[50%,40%,10%] justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
            onClick={() => {
                dispatch(actions.setCurSongId(songData?.encodeId))
                dispatch(actions.setPlay(true))
                dispatch(actions.setIsPlayAtList(true))
            }}
        >
            <div className='flex items-center gap-3 flex-1'>
                <span>
                    <BsMusicNoteBeamed />
                </span>
                <div className='w-12 h-10 rounded-md object-cover relative'>
                    <img src={songData?.thumbnail} alt="thumbnailM" className='w-full h-full object-cover rounded-md' />
                    {
                        // curSongId === songData?.encodeId && isPlaying && (
                        //     <div className='absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 rounded-md'>
                        //         {/* <Audio /> */}
                        //     </div>
                        // )
                    }
                </div>
                <span className='flex flex-col w-full'>
                    <span className='text-sm font-semibold'>{songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)}...` : songData?.title}</span>
                    <span>{songData?.artistsNames}</span>
                </span>
            </div>
            <div className='flex-1 flex items-center justify-start'>
                {songData?.album?.title?.length > 30 ? `${songData?.album?.title?.slice(0, 30)}...` : songData?.album?.title}
            </div>
            <div className='flex-1 flex justify-center'>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(List)