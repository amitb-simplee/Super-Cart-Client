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

	serverCartsUpdate() {
		this.emit("carts change");
	}

	createCart() {
		this.emit("carts change");
	}

	saveCart() {
		this.emit("carts change");
	}

	deleteCart() {
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

			case "SERVER_UPDATE": {
				this.serverCartsUpdate();
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