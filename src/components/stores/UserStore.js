import { EventEmitter } from "events";
import { Router, browserHistory } from 'react-router'
import _ from 'lodash'
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {

	constructor() {
		super();
	}

	getUser() {
		return window.sessionStorage.getItem("user");
	}

	signIn(user) {
		this.user = user;
		window.sessionStorage.setItem("userEmail", user.email);
		window.sessionStorage.setItem("userId", user.id);
		browserHistory.push('/#/carts');
		window.location.reload();
		// this.setState({user: user})
	}

	signOut() {
		this.user = null;
		window.sessionStorage.removeItem("userEmail");
		window.sessionStorage.removeItem("userId");
		browserHistory.push('/#/user');
		window.location.reload();
	}

	handleActions(action) {
		switch(action.type) {
			case "SIGN_IN": {
				this.signIn(action.user);
				break;
			}
		}
		switch(action.type) {
			case "SIGN_OUT": {
				this.signOut();
				break;
			}
		}
	}
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;