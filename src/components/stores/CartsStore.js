import { EventEmitter } from "events";
import _ from 'lodash'
import dispatcher from "../dispatcher";

class CartsStore extends EventEmitter {

	constructor() {
		super();
		this.carts = [];
	}

	getUsersCarts() {
		return this.carts;
	}

	createCart() {
		// this.carts.push({
		// 	id: item.id,
		// 	name: item.name,
		// 	date: item.date,
		// 	admin: item.admin,
		// 	users: item.users,
		// 	items: item.items
		// });

		this.emit("carts change");
	}

	saveCart() {
		// const foundCart = _.find(this.carts, cart_item => cart_item.name === oldCart.name);
		// foundCart.name = newCart.name;
		
		this.emit("carts change");
	}

	deleteCart() {
		// _.remove(this.carts, cart_item => cart_item.name === cart.name);
		// this.setState({carts: this.state.carts});
		this.emit("carts change");
	}

	updateUserCarts(carts) {
		this.carts = carts;
		this.emit("carts received");
	}

	handleActions(action) {
		switch(action.type) {
			case "CREATE_CART": {
				this.createCart();
				break;
			}
		
			case "SAVE_CART": {
				this.saveCart();
				break;
			}

			case "DELETE_CART": {
				this.deleteCart();
				break;
			}

			case "GET_CARTS": {
				this.updateUserCarts(action.carts);
				break;
			}
		}
	}

}

const cartsStore = new CartsStore;
dispatcher.register(cartsStore.handleActions.bind(cartsStore));

export default cartsStore;