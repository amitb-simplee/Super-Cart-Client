import React from 'react'
import CartList from './carts-list'
import CartCreate from '../cart/create-cart'
import { Link } from 'react-router'

const carts = [
	{
		name: "supermarket",
		date: "1/1/2017",
		admin: "user2",
		users: ["user1", "user2"]
	},
	{
		name: "farmers market",
		date: "1/2/2017",
		admin: "user1",
		users: ["user1", "user2", "user3"]
	}
]

export default class Carts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			carts
		};
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
		this.state.carts.push({
			date: "new date",
			name: name,
			admin: "me",
			users: []
		});
		this.setState({ carts: this.state.carts});
	}

	saveCart(oldCart, newCart) {
		const foundCart = _.find(this.state.carts, cart_item => cart_item.name === oldCart.name);
		foundCart.name = newCart.name;
		this.setState({carts: this.state.carts});
	}

	deleteCart(cart){
		_.remove(this.state.carts, cart_item => cart_item.name === cart.name);
		this.setState({carts: this.state.carts});
	}
}