import React from 'react'
import CartList from './carts-list'
import CartCreate from '../cart/create-cart'
import { Link } from 'react-router'
import * as CartsActions from "../actions/CartsActions"
import CartsStore from '../stores/CartsStore'

const carts = [

]
const user = {id: "1"};

export default class Carts extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
			carts: CartsStore.getAll(user.id)
		};
	}

	componentWillMount() {
		 CartsStore.on("carts change", () => {
		 	this.setState({
		 		carts: CartsStore.getAll(user.id)
		 	});
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

	deleteCart(cart){
		CartsActions.deleteCart(cart);
	}
}