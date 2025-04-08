import image from '../styles/images/linkedin.png'
import GITHUB from '../styles/images/github.png'


const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-header">Created by: Rokas</div>
      <div className='links'>
        <div className='Rokas'><a className='a-rokas' href='https://github.com/rokster112'  target='_blank' rel='noreferrer'><img src={GITHUB} style={{ height: 58, width: 58 }}></img></a></div>
        <div className="Logo"><a href="https://www.linkedin.com/in/rokas-arlauskas-8772b6244/" target="_blank" rel="noreferrer"><img src={image} height="50px"></img></a></div>
      </div>
    </div>  
  )
  
}

export default Footer