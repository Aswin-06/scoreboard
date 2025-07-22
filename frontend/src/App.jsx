import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import LeaderBoard from "./components/LeaderBoard"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/leaderboard' element={<LeaderBoard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
