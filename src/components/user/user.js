import React from 'react'
import { Link } from 'react-router'
import * as UserActions from "../actions/UserActions"
import UserStore from '../stores/UserStore'

export default class User extends React.Component {
	constructor(props) {
		super(props);

		// UserActions.getUser();
		this.state = {
			user: UserStore.getUser()
		};

		// this.userReceived = this.userReceived.bind(this);
		this.userSignIn = this.userSignIn.bind(this);
	}

	componentWillMount() {
		// UserStore.on("user received", this.userReceived);		
		// UserStore.on("user sign in", this.userSignIn);
	}

	componentWillUnmount() {
		// UserStore.removeListener("user received", this.userReceived);
		// UserStore.removeListener("user sign in", this.userSignIn);
	}

	userReceived() {
	    UserActions.getUser();
	}

	userSignIn() {
	    this.setState({
	      user: UserActions.getUserId()
	    });
	}

	render() {
		return (
		  <div>
	        <h1>User</h1>
			<form onSubmit={this.onSignInClick.bind(this)}>
				<input type="text" ref="email" placeholder="email"/>
				<button onClick={this.onSignInClick.bind(this)}>Sign in</button>
			</form>	        
	      </div>
		)
	}

	onSignInClick(event) {
		event.preventDefault();

		var userEmail = this.refs.email.value;
		var user = {email: userEmail};
		UserActions.signIn(user);
	}
}