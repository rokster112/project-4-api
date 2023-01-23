/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'
import placeholder from '../styles/images/IMAGE.jpeg'
import SingleGamePage from './SingleGamePage'

const GamesPage = () => {
  const [getGames, setGetGames] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/games/')
        setGetGames(data)
        console.log(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }
    getData()
  }, [])

  return (
    <div className='games-page-body'>
      <h1 className='game-page-name'>ALL GAMES</h1>
      <div className='games-page-container'>
        {getGames ? (getGames.map(games => {
          // eslint-disable-next-line camelcase
          const { id, title, publisher, developer, year, image_url, genres } =
            games
          return (
            <>
              <div className='games-page-game-wrapper' key={id}>
                <div className='games-page-game-container'>
                  <div className='games-page-game-inside'>
                    <Link className='games-page-link' to={`/games/${id}/`}>
                      <h5 className='games-page-title'>{title}</h5>
                      <img
                        className='games-image'
                        style={{ width: 250, height: 150 }}
                        src={image_url}
                      ></img>
                      <h5 className='games-page-year'>Year: {year}</h5>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )
        })) : (<h1>{ Loading }</h1>)
        }
      </div>
    </div>
  )
}

export default GamesPage
