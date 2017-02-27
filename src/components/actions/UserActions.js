import dispatcher from "../dispatcher";
import axios from "axios";

const base_url = "http://localhost:3001";
const sign_in_url = "/sign_in";

const saltRounds = 0;

export function signIn(user) {
	var get_url = base_url + sign_in_url ;

	axios.get(get_url, {
		params: { 
			email: user.email
		}
	}).then((res) => {
		const type = "SIGN_IN";
		var user = {id: res.data._id, email: res.data.email}
		dispatcher.dispatch({
			type: type,
			user: user
		});
	});
}