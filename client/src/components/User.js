import { Link } from 'react-router-dom'
export default function User({ username, id }) {
  return (
        <Link to={`/user/${id}`}>
          <p>{username}</p>
          <p>{id}</p>
        </Link>
  )
}