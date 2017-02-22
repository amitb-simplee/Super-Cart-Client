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
		// this.items.push({
		// 	item,
		// 	quantity,
		// 	note,
		// 	checked: false
		// });

		this.emit("item change");
	}

	toggleItem(item) {
		// const foundItem = _.find(this.items, cart_item => cart_item.item === item);
		// foundItem.checked = !foundItem.checked;

		this.emit("item change");
	}

	saveItem(oldItem, newItem) {
		// const foundItem = _.find(this.items, cart_item => cart_item.item === oldItem.item);
		// foundItem.item = newItem.item;
		// foundItem.quantity = newItem.quantity;
		// foundItem.note = newItem.note;
		
		this.emit("item change");
	}

	deleteItem(item) {
		// _.remove(this.items, cart_item => cart_item.item === item.item);
		this.emit("item change");
	}

	updateUserCart(cart) {
		// const cart = _.find(carts, cart_item => cart_item.id == cartId);
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