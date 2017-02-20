import React from 'react'
import CartList from './cart-list'
import CreateItem from '../item/create-item'
import { Link } from 'react-router'

const items = [
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

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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