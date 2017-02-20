import React from 'react'
import { Link } from 'react-router'

export default class App extends React.Component {
	render() {
		return (
			<div>
				<div>
				    <ul role="nav">
			          <li><Link to="user">User</Link></li>
			          <li><Link to="carts">Carts</Link></li>
			        </ul>
				</div>
				<h1>Super Cart Client</h1>
				{this.props.children}
			</div>
		)
	}
}