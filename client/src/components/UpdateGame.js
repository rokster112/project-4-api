import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'


const UpdateGame = () => {
  const { id } = useParams()
  const [ errors, setErrors ] = useState('')
  const [ genres, setGenres ] = useState([])
  const [game, setGame] = useState()
  const [ updateGame, setUpdateGame ] = useState({
    title: '',
    publisher: '',
    developer: '',
    year: '',
    image_url: '',
    genres: [],
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const [ data, data2 ] = await Promise.all([axios.get('/api/genres/'), 
          axios.get(`/api/games/${id}/`)])
        const gameData = data2.data
        setGame(gameData)
        setGenres(data.data)
        setUpdateGame({ title: gameData.title, publisher: gameData.publisher, developer: gameData.developer, year: gameData.year, image_url: gameData.image_url })
        console.log('games get data', gameData)
      } catch (error) {
        console.log(error)
      }
    }  
    getData()
  }, [])
  
  const handleChange = (e) => {
    setUpdateGame({ ...updateGame, [e.target.name]: e.target.value })
    setErrors(false)
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!localStorage.getItem('token')) {
      setErrors('User not logged')
      return 
    }
    try {
      const { data } = await axios.put(`/api/games/${id}/`, updateGame)
      setUpdateGame(data)
      console.log(data)
      navigate(`/games/${id}/`)
    } catch (error) {
      console.log('This is the error', error)
      setErrors(error)
    }
  }



  const handleMultiSelect = (genres) => {
    setUpdateGame({ ...updateGame, genres: genres.map((genre) => genre.id) })
  }


  console.log('Game data ======>', game)
    


  return ( 
    <div className='update-game-body'>
      <div className='update-game-container'>
        <h1 className='update-game-title'>Update a Game</h1>
        <form onSubmit={handleSubmit} className='update-game-form'>
          <input className='update-game-input'
            type='text' name='title' placeholder='Title' value={updateGame.title} onChange={handleChange}
          />
          <input className='update-game-input' type='text' name='publisher' placeholder='Publisher' defaultValue={game && game.publisher} value={updateGame.publisher} onChange={handleChange}
          />
          <input className='update-game-input' type='text' name='developer' placeholder='Developer' defaultValue={game && game.developer} value={updateGame.developer} onChange={handleChange}
          />
          <input className='update-game-input' type='text' name='year' placeholder='Year' defaultValue={game && game.year} value={updateGame.year} onChange={handleChange}
          />
          <input className='update-game-input' type='text' name='image_url' placeholder='Image Link/URL' defaultValue={game && game.image_url} value={updateGame.image_url} onChange={handleChange}
          />
          <Select
            options={genres.map((genre) => ({
              id: genre.id,
              value: genre.id,
              label: genre.name,
            }))}
            isMulti
            name='genres'
            onChange={handleMultiSelect}
          />
          <Link to={'/login/'} ><p> { errors ? errors.toString() : '' } </p></Link>
          <div className='update-game-button-container'>
            <button type='submit' className='update-game-button'>Update a Game</button>
          </div>
        </form>
      </div>
    </div>
  )




}
export default UpdateGame