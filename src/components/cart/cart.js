import React from 'react'
import CartList from './cart-list'
import CreateItem from '../item/create-item'
import { Link } from 'react-router'


const items_for_cart_1 = [
	{
		item: "tomato",
		quantity: "4",
		note: "",
		checked: false
	},
	{
		item: "carrets",
		quantity: "1",
		note: "orange",
		checked: true
	}
]

const items_for_cart_2 = [
	{
		item: "milk",
		quantity: "1",
		note: "skim milk",
		checked: false
	},
	{
		item: "eggs",
		quantity: "2",
		note: "free eggs",
		checked: true
	}
]


const carts = [
	{	
		id: "1",
		name: "supermarket",
		date: "1/1/2017",
		admin: "user2",
		users: ["user1", "user2"],
		items: items_for_cart_1
	},
	{
		id: "2",
		name: "farmers market",
		date: "1/2/2017",
		admin: "user1",
		users: ["user1", "user2", "user3"],
		items: items_for_cart_2
	}
]

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		const cart = _.find(carts, cart_item => cart_item.id == String(this.props.params.cartId));
		var items = cart.items;
		this.state = {
			cart,
			items
		};
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
		this.state.items.push({
			item,
			quantity,
			note,
			checked: false
		});
		this.setState({ items: this.state.items});
	}

	toggleItem(item) {
		const foundItem = _.find(this.state.items, cart_item => cart_item.item === item);
		foundItem.checked = !foundItem.checked;

		this.setState({items: this.state.items});
	}

	saveItem(oldItem, newItem) {
		const foundItem = _.find(this.state.items, cart_item => cart_item.item === oldItem.item);
		foundItem.item = newItem.item;
		foundItem.quantity = newItem.quantity;
		foundItem.note = newItem.note;
		this.setState({items: this.state.items});
	}

	deleteItem(item){
		_.remove(this.state.items, cart_item => cart_item.item === item.item);
		this.setState({items: this.state.items});
	}
}