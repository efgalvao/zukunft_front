import { Link } from 'react-router-dom'

export const HomePage = () => (
  <>
    <div>
      <h1>Welcome to Zukunft</h1>
      <p>A webapp to organize and register your finance. </p>
      <p>Please <Link to="/login">login</Link> to access your data</p>
    </div>
  </>
)
