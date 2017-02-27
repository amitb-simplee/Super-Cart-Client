import React from 'react'
import { Link } from 'react-router'
import SignIn from './signIn'
import SignOut from './signOut'
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
		if (window.sessionStorage.getItem("userEmail")) {
			return (
			  <div>
		        <h2>User Sign Out</h2>
				<SignOut/>
				        
		      </div>
			)			
		}
		else {
			return (
			  <div>
		        <h2>User Sign in</h2>
				<SignIn/>
				        
		      </div>
			)		
		}
	}
}