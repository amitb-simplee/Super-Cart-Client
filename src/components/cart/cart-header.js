import React from 'react'

export default class CartHeader extends React.Component {
	render() {
		var cartName = this.props.cart ? this.props.cart.name : "Undefined";
		return (		
			<h1>Cart: { cartName }</h1>		
		)
	}
}