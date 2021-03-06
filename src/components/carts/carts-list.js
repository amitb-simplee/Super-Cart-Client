import React from 'react'
import CartsHeader from './carts-header'
import CartsItem from './carts-item'
import _ from 'lodash'

export default class CartsList extends React.Component {
	renderCarts() {
		const props = _.omit(this.props, 'carts');
		return _.map(this.props.carts, (cart, index) => <CartsItem key={index} {...cart} {...props} />);
	}

	render() {
		return (
			<table className="table table-bordered">
				<CartsHeader />
				<tbody>
					{this.renderCarts()}
				</tbody>
			</table>
		)
	}
}