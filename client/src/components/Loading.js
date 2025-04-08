import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: '100%', 
        height: '50vh', 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Spinner animation="grow" size="xl" variant="light" style={{ width: '100px', height: '100px' }}/>
    </div>
  )
}

export default Loading