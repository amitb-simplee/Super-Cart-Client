import { EventEmitter } from "events";
import _ from 'lodash'
import dispatcher from "../dispatcher";

class CartsStore extends EventEmitter {

	constructor() {
		super();
		this.carts = [
			{	
				id: "1",
				name: "supermarket",
				date: "2017/1/1",
				admin: "user2",
				users: ["user1", "user2"]
			},
			{
				id: "2",
				name: "farmers market",
				date: "2017/1/2",
				admin: "user1",
				users: ["user1", "user2", "user3"]
			}
		];
	}

	createCart(name) {
		const id = "3";
		const date = "21/2/2017";
		
		this.carts.push({
			id: id,
			name: name,
			date: date,
			admin: "me",
			users: [],
			items: []
		});

		this.emit("carts change");
	}

	saveCart(oldCart, newCart) {
		const foundCart = _.find(this.carts, cart_item => cart_item.name === oldCart.name);
		foundCart.name = newCart.name;
		
		this.emit("carts change");
	}

	deleteCart(cart) {
		_.remove(this.carts, cart_item => cart_item.name === cart.name);
		// this.setState({carts: this.state.carts});
		this.emit("carts change");
	}

	getAll(userId) {
		return this.carts;
	}

	handleActions(action) {
		console.log(action);
		switch(action.type) {
			case "CREATE_CART": {
				this.createCart(action.name);
				break;
			}
		
			case "SAVE_CART": {
				this.saveCart(action.oldCart, action.newCart);
				break;
			}

			case "DELETE_CART": {
				this.deleteCart(action.cart);
				break;
			}
		}
	}

}

const cartsStore = new CartsStore;
dispatcher.register(cartsStore.handleActions.bind(cartsStore));

export default cartsStore;