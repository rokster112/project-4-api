import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'


const UpdateGame = () => {
  const { id } = useParams()
  const [ errors, setErrors ] = useState('')
  const [ genres, setGenres ] = useState([])
  const [ updateGame, setUpdateGame ] = useState({
    title: '',
    publisher: '',
    developer: '',
    year: '',
    image_url: '',
    genres: [],
  })
  console.log(updateGame)
  
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

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/genres/')
        setGenres(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }  
    getData()
  }, [])

  const handleMultiSelect = (genres) => {
    setUpdateGame({ ...updateGame, genres: genres.map((genre) => genre.id) })
  }


  console.log('NEW DATA', updateGame)
    


  return ( 
    <div className='update-game-body'>
      <div className='update-game-container'>
        <h1 className='update-game-title'>Update a Game</h1>
        <form onSubmit={handleSubmit} className='update-game-form'>
          <input className='update-game-input'
            type='text' name='title' placeholder='Title' value={updateGame.title} onChange={handleChange}
          />
          <input className='update-game-input' type='text' name='publisher' placeholder='Publisher' value={updateGame.publisher} onChange={handleChange}
          />
          <input className='update-game-input' type='text' name='developer' placeholder='Developer' value={updateGame.developer} onChange={handleChange}
          />
          <input className='update-game-input' type='text' name='year' placeholder='Year' value={updateGame.year} onChange={handleChange}
          />
          <input className='update-game-input' type='text' name='image_url' placeholder='Image Link/URL' value={updateGame.image_url} onChange={handleChange}
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
          <Link to={'/login/'} ><p> { errors } </p></Link>
          <div className='update-game-button-container'>
            <button type='submit' className='update-game-button'>Update a Game</button>
          </div>
        </form>
      </div>
    </div>
  )




}
export default UpdateGame