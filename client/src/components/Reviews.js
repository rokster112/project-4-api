import { useEffect, useState } from 'react'
import axios from 'axios'
import userId from './auth'
import { Navigate, useNavigate } from 'react-router-dom'



export default function Reviews(props) {
  const [counter, setCounter] = useState(0)
  const [errors, setErrors] = useState('')
  const [reviews, setReviews] = useState()
  const [idd, setIdd] = useState()
  const [edit, setEdit] = useState(false)
  const [editReview, setEditReview] = useState()
  const [writeReview, setWriteReview] = useState({
    title: '',
    rating: '',
    text: '',
    game: props.id,
  })
  const navigate = useNavigate()

  console.log(userId)
  console.log(reviews)


  function openReviewBox() {
    setCounter(1)
  }

  function closeReviewBox() {
    setCounter(0)
    setEdit(false)
    setWriteReview({
      ...writeReview,
      title: '',
      rating: '',
      text: '',
    })
  }

  const btnOpenStyle = {
    display: counter === 0 ? 'block' : 'none',
  }

  // const reviewId = reviews.map(one => one.id)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/reviews/')
        console.log('this is review data', data)
        setReviews(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  function handleChange(e) {
    setWriteReview({ ...writeReview, [e.target.name]: e.target.value })
  }

  console.log(writeReview)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!localStorage.getItem('token')) {
      setErrors('User not logged')
      return 
    }
    try {
      const { data } = await axios.post('/api/reviews/', writeReview)
      setWriteReview(data)
      window.location.reload()
      console.log(data)
    } catch (error) {
      console.log('This is the error', error)
      setErrors(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/reviews/${id}/`)
      setErrors(data)
      window.location.reload()
    } catch (error) {
      setErrors(error.response)
      console.log('this is delete data error --->', error)
    }
  }

  const gettingEditReviewData = async (id) => {
    try {
      const { data } = await axios.get(`/api/reviews/${id}/`)
      setWriteReview(data)
      setIdd(id)
      console.log('id =======>', id)
      setEdit(true)
      console.log('this is edit review data', data)
    } catch (error) {
      console.log('this is the error --->', error)
    }
    openReviewBox()
  }

  const putReview = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/reviews/${idd}/`, writeReview)
      setWriteReview({ data, owner: userId })
      window.location.reload()
      console.log('put review', data)
    } catch (error) {
      console.log('This is the error', error)
      setErrors(error)
    }
  }

  console.log(edit)

  // handleDelete()

  console.log(reviews)
  const mappedReviews = reviews !== undefined ? reviews.map(one => {
    // console.log(one)
    return <div className='single-review-container' key={one.id}>
      <div className='single-review-title-rating'><h2 className='single-review-title'>{one.title}</h2>
        <h2 className='single-review-rating'>{one.rating}/10</h2>
      </div>
      <p className='single-review-text'>{one.text}</p>
      {userId === one.owner ? <div><button onClick={() => handleDelete(one.id)}>Delete</button>
        <button onClick={() => gettingEditReviewData(one.id)}>Edit</button></div> : ''}
    </div>
  }) : 'Loading'

  return (
    <div>
      <h1>Reviews</h1>
      <div className='review-container'>
        {mappedReviews}
      </div>
      <button style={btnOpenStyle} onClick={openReviewBox}>Write a review</button>
      {counter === 1 ? 
        <div>
          <button onClick={closeReviewBox}>X</button>
          <form onSubmit={edit ? putReview : handleSubmit}>
            <input placeholder='Title' name='title' type='text' value={writeReview.title} onChange={handleChange}/>
            <input placeholder='Rating' name='rating' type='number' value={writeReview.rating} onChange={handleChange}/>
            <input placeholder='Text' name='text' type='text' value={writeReview.text} onChange={handleChange}/>
            <button type='submit' className='create-game-button'>Create a Review</button>
            {errors ? errors.toString() : '' }
          </form>
        </div>  
        : ''}
    </div>
  )
}