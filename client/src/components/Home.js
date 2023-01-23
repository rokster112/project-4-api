import { Link } from 'react-router-dom'


const Home = () => {

  return (
    <div className='home-body'>
      <div className='home-content-container'>
        <div className='home-title-container'>
          <h2 className='home-title'><span className='span-title'>Welcome to The Gaming Nerd Zone <br/> Here you will find a variety of reviews about games, our purpose is to help you find your next play!</span></h2>
        </div>
        <div className='home-button-container'>
          <Link to={'/games/'}><button className='home-button'>Browse Games</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Home