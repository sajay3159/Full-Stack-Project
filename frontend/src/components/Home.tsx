import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h2>Welcome to Home Page</h2>
      <ul className='App'>
        <li><NavLink  className="nav-bar-link" to="/create">Create new Student</NavLink></li>
        <li><NavLink className="nav-bar-link" to="/list">Student List</NavLink></li>
        <li><NavLink className="nav-bar-link" to="/dropdown">Dropdown</NavLink></li>
        {/* <li><NavLink className="nav-bar-link" to="/mi">MI</NavLink></li> */}
      </ul>
    </div>
  )
}
