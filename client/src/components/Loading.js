import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '200px', height: '50vh' }}>
      <Spinner animation="grow" size="xl" variant="light" />
    </div>
  )
}
export default Loading