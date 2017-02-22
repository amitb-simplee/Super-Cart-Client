import React from 'react'
import CartHeader from './cart-header'
import CartItem from './cart-item'
import _ from 'lodash'

export default class Cart extends React.Component {
	renderItems() {
		const props = _.omit(this.props, 'cart');
		if (!this.props.cart) {
			return [];
		}
		return _.map(this.props.cart.items, (item, index) => <CartItem key={index} {...item} {...props} />);
	}

	render() {
		return (
			<table>
				<CartHeader />
				<tbody>
					{this.renderItems()}
				</tbody>
			</table>
		)
	}
}