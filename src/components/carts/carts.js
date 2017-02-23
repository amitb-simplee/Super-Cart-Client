import React from 'react'
import CartList from './carts-list'
import CartCreate from '../cart/create-cart'
import { Link } from 'react-router'
import * as CartsActions from "../actions/CartsActions"
import CartsStore from '../stores/CartsStore'

const user = {id: "amit"};

export default class Carts extends React.Component {
	constructor(props) {
		super(props);
		CartsActions.getUsersCarts(user.id);
		this.state = {
			carts: CartsStore.getUsersCarts()
		};
		//
		this.cartsReceived = this.cartsReceived.bind(this);
		this.cartsRequest = this.cartsRequest.bind(this);
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
	    CartsActions.getUsersCarts(user.id);
	}

	cartsReceived() {
	    this.setState({
	      carts: CartsStore.getUsersCarts(user.id)
	    });
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
		CartsActions.createCart(name);
	}

	saveCart(oldCart, newCart) {
		CartsActions.saveCart(oldCart, newCart);
	}

	deleteCart(cart) {
		CartsActions.deleteCart(cart);
	}
}