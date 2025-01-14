import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav (props) {
  const {authedUser} = props
  
   return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
            <div> Hello {authedUser}</div>
         
         
        </li>
        <li>
          <NavLink to='/signin' activeClassName='active'>
            Log out
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}