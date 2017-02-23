import { EventEmitter } from "events";
import _ from 'lodash'
import dispatcher from "../dispatcher";

class CartStore extends EventEmitter {

	constructor() {
		super();
	}

	getUserCart() {
		return this.cart;
	}

	createItem(item, quantity, note) {
		this.emit("item change");
	}

	toggleItem(item) {
		this.emit("item change");
	}

	saveItem(oldItem, newItem) {
		this.emit("item change");
	}

	deleteItem(item) {
		this.emit("item change");
	}

	updateUserCart(cart) {
		this.cart = cart;
		this.emit("cart received");
	}

	handleActions(action) {
		switch(action.type) {
			case "CREATE_ITEM": {
				this.createItem();
				break;
			}

			case "TOGGLE_ITEM": {
				this.toggleItem();
				break;
			}

			case "SAVE_ITEM": {
				this.saveItem();
				break;
			}

			case "DELETE_ITEM": {
				this.deleteItem();
				break;
			}

			case "GET_CART": {
				this.updateUserCart(action.cart);
				break;
			}
		}
	}
}

const cartStore = new CartStore;
dispatcher.register(cartStore.handleActions.bind(cartStore));

export default cartStore;