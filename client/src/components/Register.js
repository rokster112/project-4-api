import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [ registerData, setRegisterData ] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '', 
  })
  
  const navigate = useNavigate()
  
  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    setErrors(false)
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const { data } = await axios.post('/api/auth/register/', registerData)
      navigate('/login')
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data)
        console.log(setErrors)
      }
    }
  
  }
  
  
  return (
    <div className='register-body'>
      <div className='register-container'>
        <h1 className='register-title'>Registration form</h1>
        <form onSubmit={onSubmit} className='register-form'>
          <input className='register-input'
            type='text' name='username' placeholder='Username' value={registerData.username} onChange={handleChange}
          />
          <input className='register-input' type='text' name='email' placeholder='Email' value={registerData.email} onChange={handleChange}
          />
          <input className='register-input' type='password' name='password' placeholder='Password' value={registerData.password} onChange={handleChange}
          />

          <input className='register-input' type='password' name='confirm_password' placeholder='Confirm Password' value={registerData.confirm_password} onChange={handleChange}
          />
          {/* <p className='error'>{errors}</p> */}
          <div className='register-button-container'>
            <button type='submit' className='register-button'>Register</button>
          </div>
        </form>
      </div>
    </div>
    
  )
  
}

export default Register