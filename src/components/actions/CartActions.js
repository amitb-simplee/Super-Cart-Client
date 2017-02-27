import dispatcher from "../dispatcher";
import axios from "axios";

const base_url = "http://localhost:3001";
const carts_url = "/carts";
const items_url = "/items";


export function createItem(userId, cart, item) {
	var post_url = base_url + carts_url + "/" + cart._id + items_url;
	axios.post(post_url, {
		userId: userId,
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

export function saveItem(userId, cart, oldItem, newItem) {
	var put_url = base_url + carts_url + "/" + cart._id + items_url + "/" + oldItem._id;
	axios.put(put_url, {
		userId: userId,
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

export function toggleItem(userId, cart, item) {
	var put_url = base_url + carts_url + "/" + cart._id + items_url + "/" + item._id;
	axios.put(put_url, {
		userId: userId,
		checked: !item.checked
	}).then((data) => {
		const type = "SAVE_ITEM";
		dispatcher.dispatch({
			type: type
		});
	});	
}

export function deleteItem(userId, cart, item) {
	var delete_url = base_url + carts_url + "/" + cart._id + items_url + "/" + item._id;
	axios.delete(delete_url, {
		params: { 
			userId: userId
		}	
	}).then((data) => {
		const type = "DELETE_ITEM";
		dispatcher.dispatch({
			type: type
		});
	});	
}

export function getUserCart(userId, cartId) {
	var get_url = base_url + carts_url + "/" + cartId;
	axios.get(get_url, {
		params: { 
			userId: userId
		}	
	}).then((data) => {
		const type = "GET_CART";
		dispatcher.dispatch({
			type: type,
			cart: data.data
		});
	});	
}

export function servertCartUpdate() {
	const type = "SERVER_UPDATE";
	sleep(50);
    dispatcher.dispatch({
		type: type
	});
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}