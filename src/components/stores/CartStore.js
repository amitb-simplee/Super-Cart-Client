import { EventEmitter } from "events";
import _ from 'lodash'
import dispatcher from "../dispatcher";


const items_for_cart_1 = [
	{
		item: "tomato",
		quantity: "4",
		note: "",
		checked: false
	},
	{
		item: "carrets",
		quantity: "1",
		note: "orange",
		checked: true
	}
]

const items_for_cart_2 = [
	{
		item: "milk",
		quantity: "1",
		note: "skim milk",
		checked: false
	},
	{
		item: "eggs",
		quantity: "2",
		note: "free eggs",
		checked: true
	}
]

const carts = [
	{	
		id: "1",
		name: "supermarket",
		date: "2017/1/1",
		admin: "user2",
		users: ["user1", "user2"],
		items: items_for_cart_1
	},
	{
		id: "2",
		name: "farmers market",
		date: "2017/1/2",
		admin: "user1",
		users: ["user1", "user2", "user3"],
		items: items_for_cart_2
	}
]

class CartStore extends EventEmitter {

	constructor() {
		super();
	}

	getCart(cartId) {
		const cart = _.find(carts, cart_item => cart_item.id == cartId);
		this.cart = cart;
		this.items = cart.items;
		return cart;
	}

	createItem(item, quantity, note) {
		this.items.push({
			item,
			quantity,
			note,
			checked: false
		});

		this.emit("item change");
	}

	toggleItem(item) {
		const foundItem = _.find(this.items, cart_item => cart_item.item === item);
		foundItem.checked = !foundItem.checked;

		this.emit("item change");
	}

	saveItem(oldItem, newItem) {
		const foundItem = _.find(this.items, cart_item => cart_item.item === oldItem.item);
		foundItem.item = newItem.item;
		foundItem.quantity = newItem.quantity;
		foundItem.note = newItem.note;
		
		this.emit("item change");
	}

	deleteItem(item) {
		_.remove(this.items, cart_item => cart_item.item === item.item);
		this.emit("item change");
	}

	handleActions(action) {
		switch(action.type) {
			case "CREATE_ITEM": {
				this.createItem(action.item, action.quantity, action.note);
				break;
			}

			case "TOGGLE_ITEM": {
				this.toggleItem(action.item);
				break;
			}

			case "SAVE_ITEM": {
				this.saveItem(action.oldItem, action.newItem);
				break;
			}

			case "DELETE_ITEM": {
				this.deleteItem(action.item);
				break;
			}
		}
	}
}

const cartStore = new CartStore;
dispatcher.register(cartStore.handleActions.bind(cartStore));

export default cartStore;