import React from 'react'
import CartList from './cart-list'
import CartHeader from '../cart/cart-header'
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

		// cinding listener functions
		this.cartReceived = this.cartReceived.bind(this);
		this.cartRequest = this.cartRequest.bind(this);
	}

	componentWillMount() {
		CartStore.on("cart received", this.cartReceived);		
		CartStore.on("item change", this.cartRequest);
	}

	componentWillUnmount() {
		CartStore.removeListener("cart received", this.cartReceived);
		CartStore.removeListener("item change", this.cartRequest);
	}

	cartRequest() {
		CartActions.getUserCart(user, this.props.params.cartId);
	}

	cartReceived() {
	    var cartId = String(this.props.params.cartId);
		this.setState({
	      cart: CartStore.getUserCart()
	    });
	}

	render() {
		var cart = CartStore.getUserCart();
		return (
			<div>
				<CartHeader 
					cart={cart}
				/>
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

		debugger;
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