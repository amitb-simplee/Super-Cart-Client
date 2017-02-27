import React from 'react'
import * as UserActions from "../actions/UserActions"
import UserStore from '../stores/UserStore'

export default class SignOut extends React.Component {
	render() {
		return (		
			<span>{window.sessionStorage.getItem("userEmail")}  <button onClick={this.onSignOutClick.bind(this)}>Sign Out</button></span>
		)
	}


	onSignOutClick(event) {
		event.preventDefault();
		UserActions.signOut();
	}
}