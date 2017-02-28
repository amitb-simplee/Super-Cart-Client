import React from 'react'
import CartsUsersItem from './carts-users-item'
import CartsUsersListAdd from './carts-users-list-add'
import _ from 'lodash'

export default class CartsUsersList extends React.Component {
	renderUsers() {
		const props = _.omit(this.props, 'users');
		if (!this.props.users) {
			return [];
		}

		return _.map(this.props.cart.users, (user, index) => <CartsUsersItem key={index} user={user} {...props}/>);
	}

	render() {
		return (
			<ul>
				<CartsUsersListAdd 
					cart={this.props.cart}
					addUser={this.props.addUser}
				/>
				{this.renderUsers()}
			</ul>
		)
	}
}