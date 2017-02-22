import React from 'react'
import CartList from './cart-list'
import CreateItem from '../item/create-item'
import { Link } from 'react-router'
import * as CartActions from "../actions/CartActions"
import CartStore from '../stores/CartStore'

const user = {id: "amit"};

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		var cartId = String(this.props.params.cartId);
		CartActions.getUserCart(user, cartId);
		this.state = {
			cart: CartStore.getUserCart()
		};
	}

	componentDidMount() {
		CartStore.on("cart received", this.CartReceived.bind(this));		
		CartStore.on("item change", this.CartRequest);
	}

	componentWillUnmount() {
		CartStore.removeListener("cart received", this.CartReceived.bind(this));
		CartStore.removeListener("item change", this.CartRequest);
	}

	CartRequest() {
		CartActions.getUserCart(user, this.cart._id);
	}

	CartReceived() {
	    var cartId = String(this.props.params.cartId);
		this.setState({
	      cart: CartStore.getUserCart()
	    });
	}

	render() {
		return (
			<div>
				<CreateItem 
					cart={this.state.cart}
					createItem={this.createItem.bind(this)}
				/>
				<CartList 
					cart={this.state.cart}
					toggleItem={this.toggleItem.bind(this)}
					saveItem={this.saveItem.bind(this)}
					deleteItem={this.deleteItem.bind(this)}
				/>
			</div>
		)
	}

	createItem(name, quantity, note) {
		var cart = CartStore.getUserCart();
		var item = {name: name, quantity: quantity, note, note};
		CartActions.createItem(user, cart, item);
	}

	toggleItem(item) {
		var cart = CartStore.getUserCart();	
		CartActions.toggleItem(user, cart, item);
	}

	saveItem(oldItem, newItem) {
		var cart = CartStore.getUserCart();
		CartActions.saveItem(user, cart, oldItem, newItem);
	}

	deleteItem(item){
		var cart = CartStore.getUserCart();
		CartActions.deleteItem(user, cart, item);
	}
}