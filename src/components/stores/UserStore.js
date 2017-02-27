import { EventEmitter } from "events";
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
		// this.setState({user: user})
	}


	handleActions(action) {
		switch(action.type) {
			case "SIGN_IN": {
				this.signIn(action.user);
				break;
			}
		}
	}
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;