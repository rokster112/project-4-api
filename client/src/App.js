import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Components
import CreateGamePage from './components/CreateGamePage'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import PageNavbar from './components/PageNavbar'
import Register from './components/Register'
import NotFound from './components/NotFound'
import SingleGamePage from './components/SingleGamePage' 
import GamesPage from './components/GamesPage'
import UpdateGame from './components/UpdateGame'
import Reviews from './components/Reviews'
import userId from './components/auth'


const App = () => {

  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      console.log(userId)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    } catch (error) {
      console.log(error)
    }
  }, [userId])
  return (
    <div className= 'App'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/games' element = {<GamesPage/>} />
          <Route path = '/games/create' element = {<CreateGamePage/>} />
          <Route path = '/games/update/:id' element = {<UpdateGame/>} />
          <Route path = '/games/:id' element = {<SingleGamePage/>} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '*' element = {<NotFound/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
