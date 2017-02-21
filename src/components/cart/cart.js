import React from 'react'
import CartList from './cart-list'
import CreateItem from '../item/create-item'
import { Link } from 'react-router'
import * as CartActions from "../actions/CartActions"
import CartStore from '../stores/CartStore'



export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		var cartId = String(this.props.params.cartId);
		const cart = CartStore.getCart(cartId);
		var items = cart.items;
		this.state = {
			cart: cart,
			items: items
		};
	}

	componentWillMount() {
		var cartId = String(this.props.params.cartId);
		const cart = CartStore.getCart(cartId);
		var items = cart.items;

		CartStore.on("item change", () => {
		 	this.setState({
		 		cart: cart,
				items: items
		 	});
		});

		 //TODO: on carts change, update carts name?
	}

	render() {
		return (
			<div>
				<CreateItem 
					items={this.state.items}
					createItem={this.createItem.bind(this)}
				/>
				<CartList 
					items={this.state.items}
					toggleItem={this.toggleItem.bind(this)}
					saveItem={this.saveItem.bind(this)}
					deleteItem={this.deleteItem.bind(this)}
				/>
			</div>
		)
	}

	createItem(item, quantity, note) {
		CartActions.createItem(item, quantity, note);
	}

	toggleItem(item) {
		CartActions.toggleItem(oldItem, newItem);
	}

	saveItem(oldItem, newItem) {
		CartActions.saveItem(oldItem, newItem);
	}

	deleteItem(item){
		CartActions.deleteItem(item);
	}
}