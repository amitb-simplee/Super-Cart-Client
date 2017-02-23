import dispatcher from "../dispatcher";
import axios from "axios";

const base_url = "http://localhost:3001";
const carts_url = "/carts";
const items_url = "/items";


export function createItem(user, cart, item) {
	var post_url = base_url + carts_url + "/" + cart._id + items_url;
	axios.post(post_url, {
		userId: user.id,
		name: item.name,
		quantity: item.quantity,
		note: item.note
	}).then((data) => {
		const type = "CREATE_ITEM";
		dispatcher.dispatch({
			type: type
		});
	});
}

export function saveItem(user, cart, oldItem, newItem) {
	var put_url = base_url + carts_url + "/" + cart._id + items_url + "/" + oldItem._id;
	axios.put(put_url, {
		userId: user.id,
		name: newItem.name,
		quantity: newItem.quantity,
		note: newItem.note
	}).then((data) => {
		const type = "SAVE_ITEM";
		dispatcher.dispatch({
			type: type
		});
	});	
}

export function toggleItem(user, cart, item) {
	var put_url = base_url + carts_url + "/" + cart._id + items_url + "/" + item._id;
	axios.put(put_url, {
		userId: user.id,
		checked: !item.checked
	}).then((data) => {
		const type = "SAVE_ITEM";
		dispatcher.dispatch({
			type: type
		});
	});	
}

export function deleteItem(user, cart, item) {
	var delete_url = base_url + carts_url + "/" + cart._id + items_url + "/" + item._id;
	axios.delete(delete_url, {
		userId: user.id		
	}).then((data) => {
		const type = "DELETE_ITEM";
		dispatcher.dispatch({
			type: type
		});
	});	
}

export function getUserCart(user, cartId) {
	var get_url = base_url + carts_url + "/" + cartId;
	axios.get(get_url, {
		userId: user.id		
	}).then((data) => {
		const type = "GET_CART";
		dispatcher.dispatch({
			type: type,
			cart: data.data
		});
	});	
}