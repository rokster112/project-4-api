import { useEffect, useState } from 'react'
import axios from 'axios'
import userId from './auth'

export default function Reviews(props) {
  const [counter, setCounter] = useState(0)
  const [errors, setErrors] = useState('')
  const [reviews, setReviews] = useState()
  const [idd, setIdd] = useState()
  const [edit, setEdit] = useState(false)
  const [writeReview, setWriteReview] = useState({
    title: '',
    rating: '',
    text: '',
    game: props.id,
  })

  // console.log(userId)

  // console.log('reviews', reviews)

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
    width: 150, display: counter === 0 ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', marginInline: 'auto', marginBlock: 20,
  }

  // const reviewId = reviews.map(one => one.id)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/reviews/')
        console.log('reviews =>', data)
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
      setEdit(true)
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
    } catch (error) {
      console.log('This is the error', error)
      setErrors(error)
    }
  }


  const mappedReviews = reviews !== undefined ? reviews.map(one => {
    if (one.game === Number(props.id)) {
      const date = new Date(one.created_at)
      const formattedDate = date.toLocaleString()
      return <div className='single-review-container' key={one.id}>
        <div className='single-review-title-rating'><h2 className='single-review-title'>{one.title}</h2>
          <h2 className='single-review-rating'>Rating: {one.rating}/10</h2>
        </div>
        <p className='single-review-text'>{one.text}</p>
        <div className='single-review-button-username-container'>
          {userId === one.owner ? <div className='single-review-button-container'><button onClick={() => handleDelete(one.id)} className='single-review-buttons delete'>Delete</button>
            <button onClick={() => gettingEditReviewData(one.id)} className='single-review-buttons edit'>Edit</button></div> : ''}
          <div className='single-review-username-container'><p className='username'>{one.user_name}</p><p className='date'>{formattedDate}</p></div></div>
      </div>
    } else {
      return
    }
  }) : 'Loading'

  return (
    <div className='review-page'>
      <h1 className='review-title'>Reviews</h1>
      <div className='review-container'>
        {mappedReviews}
      </div>
      <button style={btnOpenStyle} className='single-review-buttons' onClick={openReviewBox}>Write a review</button>
      {counter === 1 ? 
        <div className='review-form-container'>
          <button className='close-btn' onClick={closeReviewBox}>X</button>
          <form className='review-form' onSubmit={edit ? putReview : handleSubmit}>
            <input className='review-input' placeholder='Title' name='title' type='text' value={writeReview.title} onChange={handleChange}/>
            <input className='review-input' placeholder='Rating 1-10' name='rating' type='number' value={writeReview.rating} onChange={handleChange}/>
            <textarea
              name='text'
              placeholder='Write your review here'
              onChange={handleChange}
              value={writeReview.text}
              className='review-input'
              rows='4' cols='50'
            />
            <button type='submit' className='single-review-buttons create'>{edit ? 'Update Review' : 'Create a Review'}</button>
            {errors ? errors.toString() : '' }
          </form>
        </div>  
        : ''}
    </div>
  )
}