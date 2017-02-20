import React from 'react'
import CartHeader from './cart-header'
import CartItem from './cart-item'
import _ from 'lodash'

export default class Cart extends React.Component {
	renderItems() {
		const props = _.omit(this.props, 'items');

		return _.map(this.props.items, (item, index) => <CartItem key={index} {...item} {...props} />);
	}

	render() {
		console.log(this.props);
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