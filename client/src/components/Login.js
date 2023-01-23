import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [ loginData, setloginData ] = useState({
    username: '',
    password: '',
  })
  
  const navigate = useNavigate()
  
  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value })
    setErrors(false)
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const res = await axios.post('/api/auth/login/', loginData)
      const { token } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('username', loginData.username)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      console.log('TOKEN --->', token)
      console.log('username --->', loginData.username)
      navigate('/')
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
  }
  console.log(loginData)
  
  
  return (
    <div className='login-body'>
      <div className='login-container'>
        <h1 className='login-title'>Login Form</h1>
        {/* {errors && <div className='error'>{errors}</div>} */}
        <form onSubmit={onSubmit} className='login-form'>
          <input className='login-input' type='text' name='username' placeholder='Username' value={loginData.username} onChange={handleChange}
          />
          <input className='login-input' type='password' name='password' placeholder='Password' value={loginData.password} onChange={handleChange}
          />
          <div className='login-button-container'>
            <button type='submit' className='login-button'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
  
}

export default Login