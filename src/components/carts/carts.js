import React from 'react'
import CartList from './carts-list'
import CartCreate from '../cart/create-cart'
import { Link } from 'react-router'
import * as CartsActions from "../actions/CartsActions"
import CartsStore from '../stores/CartsStore'
import UserStore from '../stores/UserStore'
import io from 'socket.io-client'

const userId = window.sessionStorage.getItem("userEmail");
var socket = null;		
export default class Carts extends React.Component {
	constructor(props) {
		super(props);
		if (!userId) {
			UserStore.signOut();
		}

		CartsActions.getUsersCarts(userId);
		this.state = {
			carts: CartsStore.getUsersCarts()
		};
		//
		this.cartsReceived = this.cartsReceived.bind(this);
		this.cartsRequest = this.cartsRequest.bind(this);

		this.socketConnect(); 
	}

	componentWillMount() {
		CartsStore.on("carts received", this.cartsReceived);		
		CartsStore.on("carts change", this.cartsRequest);
	}

	componentWillUnmount() {
		CartsStore.removeListener("carts received", this.cartsReceived);
		CartsStore.removeListener("carts change", this.cartsRequest);
	}

	cartsRequest() {
	    CartsActions.getUsersCarts(userId);
	}

	cartsReceived() {
	    this.setState({
	      carts: CartsStore.getUsersCarts(userId)
	    });
	}

	socketConnect() {
		
		socket = io.connect('http://localhost:4008', {query: userId, reconnect: true});

		// Add a connect listener
		socket.on('connect', function (socket) {
		    console.log('Connected!');
		    
		});

		// Server Listener for update in cart
		socket.on('server:carts_update', function (data) {
		    console.log('server:carts_update: ', data.cart);
		    CartsActions.servertCartsUpdate();
		});
		
	}

	BroadcastCartsUpdate() {
		var data = {userId: userId};
		socket.emit('client:carts_update', data);
	}

	render() {
		return (
			<div>
				<CartCreate 
					carts={this.state.carts}
					createCart={this.createCart.bind(this)}
				/>
				<CartList
					carts={this.state.carts}
					saveCart={this.saveCart.bind(this)}
					deleteCart={this.deleteCart.bind(this)}
				/>
			</div>
		)
	}
	createCart(name) {
		CartsActions.createCart(name, userId);
		this.BroadcastCartsUpdate();
	}

	saveCart(oldCart, newCart) {
		console.log("Carts saveCart");
		CartsActions.saveCart(oldCart, newCart, userId);
		this.BroadcastCartsUpdate();
	}

	deleteCart(cart) {
		CartsActions.deleteCart(cart, userId);
		this.BroadcastCartsUpdate();
	}
}