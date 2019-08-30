import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import * as auth from '../../../api/auth'

const AuthenticatedLinks = ({ user, currentUserId, history, logoutUser }) => {
  const logout = () => {
    logoutUser()
    history.push('/login')
  }

  return (
    <ul className='nav justify-content-start'>
      <li className='nav-item'>
        <link className='nav-item' to='/'>
          Home
        </link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/students'>
          All Students
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to={`/assignments/new`}>
            Create a New Assignment
        </Link>
      </li>
      <li className='nav-item'>
        <button
          className='btn btn-link'
          onClick={logout}>
            Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(AuthenticatedLinks)
