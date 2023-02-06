/* eslint-disable camelcase */
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'
import userId from './auth'



const SingleGamePage = () => {
  const { id, genre } = useParams()
  const [singleGame, setSingleGame] = useState()
  const [errors, setErrors] = useState(false)

  const navigate = useNavigate()
  console.log(singleGame)

  // console.log(singleGame)
  const ratingArr = []

  singleGame !== undefined ? singleGame.reviews.map(game => {
    ratingArr.push(game.rating)
    return ratingArr
  }) : 'Loading'

  const ratingAverage = ratingArr.reduce((currentVal, nextVal) => {
    return currentVal + nextVal
  }, 0) / ratingArr.length

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/games/${id}/`, singleGame)
        setSingleGame(data)
      } catch (error) {
        console.log(error)
        setErrors(error)
      }
    }
    getData()
  }, [])

  function loadingGenres() {
    let arr = []
    let mappedGenres
    if (singleGame === undefined) {
      return arr
    } else {
      arr = singleGame.genres
      return mappedGenres = arr.map(item => {
        return <p key={item.name} className="genres-one">{item.name}</p>
      })
    }
  }



  const deleteGame = async id => {
    try {
      const { data } = await axios.delete(`/api/games/${id}/`)
      setErrors(data)
      window.location.reload(navigate('/games'))
    } catch (error) {
      setErrors(error.response)
    }
  }

  return (
    <div className='single-game-page-body'>
      <p className='average'>Score: {ratingAverage ? Math.round(ratingAverage * 10) / 10 : '0'} ★</p>
      <div className='single-game-page-container'>
        {singleGame ? (
          <>
            <div className='single-game-title-container'>
              <h1 className='single-game-title'>{singleGame.title}</h1>
            </div>
            <div className='single-game-description-container'>
              <div className='single-game-image-container'>
                <img
                  className='single-game-image'
                  src={singleGame.image_url}
                ></img>
              </div>
              <div className='single-game-box'>
                <h4 className='single-game-description'>
                  Year: {singleGame.year}
                </h4>
                <h4 className='single-game-description'>
                  Publisher: {singleGame.publisher}
                </h4>
                <h4 className='single-game-description'>
                  Developer: {singleGame.developer}
                </h4>
                <h4 className='single-game-description genres'>Genres: [{loadingGenres()}]</h4>
              </div>
            </div>
          </>
        ) : (
          <h1>{ Loading }</h1>
        )}
        { singleGame && singleGame.owner === userId ?
          <div className='single-game-button-container'>
            <button
              className='single-game-buttons'
              onClick={() => {
                deleteGame(id)
              }}
            >
            Delete
            </button>
            <Link to={`/games/update/${id}/`}>
              <button className='single-game-buttons'>EDIT</button>
            </Link>
          </div>
          : ''}
      </div>
          
      <Reviews id={id}/>
    </div>
  )
}

export default SingleGamePage
