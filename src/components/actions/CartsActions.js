import dispatcher from "../dispatcher";
import axios from "axios";

const base_url = "http://localhost:3001";
const carts_url = "/carts";

export function createCart(name, userId) {
	var post_url = base_url + carts_url;
	axios.post(post_url, {
		name: name,
		userId: userId
	}).then((data) => {
		const type = "CREATE_CART";
		dispatcher.dispatch({
			type: type
		});
	});
}

export function saveCart(oldCart, newCart, userId) {
	var put_url = base_url + carts_url + "/" + oldCart._id;
	axios.put(put_url, {
			id: oldCart._id,
			name: newCart.name,
			userId: userId
	}).then((data) => {
		const type = "SAVE_CART";
		dispatcher.dispatch({
			type: type
		});
	});	
}

export function deleteCart(cart, userId) {
	var delete_url = base_url + carts_url + "/" + cart._id;
	axios.delete(delete_url, {
			userId: userId 
		}).then((data) => {
		const type = "DELETE_CART";
		dispatcher.dispatch({
			type: type
		});
	});	
}

export function getUsersCarts(userId) {
	var get_url = base_url + carts_url;
	axios.get(get_url, {
		params: { 
			userId: userId
		}
	}).then((data) => {
		const type = "GET_CARTS";
		dispatcher.dispatch({
			type: type,
			carts: data.data
		});
	});	
}
