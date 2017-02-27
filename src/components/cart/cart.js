import React from 'react'
import CartList from './cart-list'
import CartHeader from '../cart/cart-header'
import CreateItem from '../item/create-item'
import { Link } from 'react-router'
import * as CartActions from "../actions/CartActions"
import CartStore from '../stores/CartStore'
import io from 'socket.io-client'

const user = window.sessionStorage.getItem("userEmail");
var socket = null;
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

		this.socketConnect(); 
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

	socketConnect() {
		
		var cartParam = `cart=${String(this.props.params.cartId)}`;

		socket = io.connect('http://localhost:4008', {query: cartParam, reconnect: true});

		// Add a connect listener
		socket.on('connect', function (socket) {
		    console.log('Connected!');
		    
		});

		// Server Listener for update in cart
		socket.on('server:cart_update', function (data) {
		    console.log('server:cart_update: ', data.cart);
		    CartActions.servertCartUpdate();
		});
		
	}

	BroadcastCartUpdate() {
		var cart = CartStore.getUserCart();
		var data = {cart: cart._id};
		socket.emit('client:item_update', data);
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
		this.BroadcastCartUpdate();
	}

	toggleItem(item) {
		var cart = CartStore.getUserCart();
		CartActions.toggleItem(user, cart, item);
		this.BroadcastCartUpdate();
	}

	saveItem(oldItem, newItem) {
		var cart = CartStore.getUserCart();
		CartActions.saveItem(user, cart, oldItem, newItem);
		this.BroadcastCartUpdate();
	}

	deleteItem(item){
		var cart = CartStore.getUserCart();
		CartActions.deleteItem(user, cart, item);
		this.BroadcastCartUpdate();
	}
}