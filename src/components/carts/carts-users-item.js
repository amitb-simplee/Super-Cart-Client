import React from 'react'
import { Link } from 'react-router'

export default class CartsUsersItem extends React.Component {
	constructor(props) {
		super(props);
		
	}

	renderActionSection() {
		return (
			<span>
				<button onClick={this.onRemoveUser.bind(this, this.props.user)}>X</button>
				{this.props.user}			
			</span>
		);
		
	}

	render() {
		return (
			<li>
				{this.renderActionSection()}
			</li>
		)
	}

	onRemoveUser(removedUser) {
		event.preventDefault();
		this.props.removeUser(removedUser);
		this.setState({isEditing: false});
	}

	// onSaveClick(event) {
	// 	event.preventDefault();

	// 	const oldCart = this.props;
	// 	var newCartNameValue = this.refs.editName.value;
	// 	var addedUser = this.refs.editUsers.value;
	// 	const newCart = {date: oldCart.date, name: newCartNameValue, users: addedUser}
	// 	this.props.saveCart(oldCart, newCart);
	// 	this.setState({isEditing: false});
	// }

	// onDeleteClick() {
	// 	const deleteCart = this.props;
	// 	this.props.deleteCart(deleteCart);
	// }
}