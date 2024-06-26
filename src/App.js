import { Album, Home, Main, Radio, Zingchart, TopSongs, Top100 } from "./containers/public"
import { WeekChartItems, SearchPage, SearchAll, SearchSongs, SearchAuthor, SearchAlbum } from "./components"
import { Library } from "./containers/system"
import { Route, Routes } from "react-router-dom";
import path from "./utils/path"
import { useEffect } from 'react'
import * as actions from './store/actions/home'
import { useDispatch } from 'react-redux';
import 'react-tooltip/dist/react-tooltip.css'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHome())
  }, [])
  return (
    <div>
      <Routes>
        <Route path={path.MAIN} element={<Main />}>
          <Route path={path.LIBRARY} element={<Library />} />
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ZINGCHART} element={<Zingchart />} />
          <Route path={path.RADIO} element={<Radio />} />
          <Route path={path.PLAYLIST} element={<Album />} />
          <Route path={path.WEEKCHART} element={<WeekChartItems />} />
          <Route path={path.HUD} element={<Album />} />
          <Route path={path.NEWSONGS} element={<TopSongs />} />
          <Route path={path.TOP100} element={<Top100 />} />
          <Route path={path.SEARCHPAGE} element={<SearchPage />}>
            <Route path={path.ALL} element={<SearchAll />} />
            <Route path={path.SONGS} element={<SearchSongs />} />
            <Route path={path.ALBUM} element={<SearchAlbum />} />
            <Route path={path.AUTHOR} element={<SearchAuthor />} />
          </Route>
          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
