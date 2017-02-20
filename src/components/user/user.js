import React from 'react'
import { Link } from 'react-router'

export default class User extends React.Component {
	render() {
		return (
		  <div>
			<div>
			    <ul role="nav">
			      <li><Link to="/user">User</Link></li>
			      <li><Link to="/">Cart</Link></li>
			    </ul>
			</div>
	        <h1>User</h1>
	      </div>
		)
	}
}