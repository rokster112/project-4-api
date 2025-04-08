import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'

const CreateGamePage = () => {
  const [errors, setErrors] = useState('')
  const [genres, setGenres] = useState([])
  const [createGame, setCreateGame] = useState({
    title: '',
    publisher: '',
    developer: '',
    year: '',
    image_url: '',
    genres: [],
  })

  const handleChange = (e) => {
    const value = e.target.name === 'year' ? Number(e.target.value) : e.target.value
    setCreateGame({ ...createGame, [e.target.name]: value })
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
      const { data } = await axios.post('/api/games/', createGame)
      setCreateGame(data)
      navigate(`/games/${data.id}/`)
    } catch (error) {
      console.log('This is the error', error.response ? error.response.data : error.message)
      setErrors(error.response ? error.response.data : error.message)
    }
  }
  

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/genres/')
        setGenres(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleMultiSelect = (genres) => {
    setCreateGame({ ...createGame, genres: genres.map((genre) => genre.id) })
  }

  return (
    <div className='create-game-body'>
      <div className='create-game-container'>
        <h1 className='create-game-title'>Create a Game</h1>
        <form onSubmit={handleSubmit} className='create-game-form'>
          <input
            className='create-game-input'
            type='text'
            name='title'
            placeholder='Title'
            value={createGame.title}
            onChange={handleChange}
          />
          <input
            className='create-game-input'
            type='text'
            name='publisher'
            placeholder='Publisher'
            value={createGame.publisher}
            onChange={handleChange}
          />
          <input
            className='create-game-input'
            type='text'
            name='developer'
            placeholder='Developer'
            value={createGame.developer}
            onChange={handleChange}
          />
          <input
            className='create-game-input'
            type='number'
            name='year'
            placeholder='Year'
            value={createGame.year}
            onChange={handleChange}
          />
          <input
            className='create-game-input'
            type='text'
            name='image_url'
            placeholder='Image Link/URL'
            value={createGame.image_url}
            onChange={handleChange}
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
          <Link to={'/login/'}>
            <p className='create-game-error'> {errors ? errors.toString() : ''} </p>
          </Link>
          <div className='create-game-button-container'>
            <button type='submit' className='create-game-button'>
              Create a Game
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGamePage
