import React from 'react'
import { Link } from 'react-router'
import styles from './app.css';

export default class App extends React.Component {
	render() {
		return (
			<div className="container">
				<div>
				    <ul role="nav" className="nav nav-tabs">
			          <li className="nav-item"><Link to="user" className="nav-link" >{window.sessionStorage.getItem("userEmail") ? window.sessionStorage.getItem("userEmail") : "Sign In"}</Link></li>
			          <li className="nav-item"><Link to="carts" className="nav-link">Carts</Link></li>
			        </ul>
				</div>
				<h1>Super Cart Client</h1>
				{this.props.children}
			</div>
		)
	}
}