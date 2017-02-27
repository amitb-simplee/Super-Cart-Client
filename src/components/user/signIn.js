import React from 'react'
import * as UserActions from "../actions/UserActions"
import UserStore from '../stores/UserStore'

export default class SignIn extends React.Component {
	render() {
		return (		
			<form onSubmit={this.onSignInClick.bind(this)}>
				<input type="text" ref="email" placeholder="email"/>
				<button onClick={this.onSignInClick.bind(this)}>Sign in</button>
			</form>			
		)
	}


	onSignInClick(event) {
		event.preventDefault();

		var userEmail = this.refs.email.value;
		var user = {email: userEmail};
		UserActions.signIn(user);
	}
}