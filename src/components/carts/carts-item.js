import React from 'react'
import { Link } from 'react-router'
import CartsUsersList from './carts-users-list'

export default class CartsItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false
		};
	}

	renderCartSection(type, item) {
		if (this.state.isEditing) {
			if (type == "Users") {
				return (
					<td>
						<CartsUsersList
							cart={this.props}
							users={this.props.users}
							addUser={this.onAddUser.bind(this)}
							removeUser={this.onRemoveUser.bind(this)}
						/>
					</td>
				)
			}
			else {
				return (
					<td>
						<form onSubmit={this.onSaveClick.bind(this)}>
							<input type="text" defaultValue={item} ref={"edit"+type} />
						</form>
					</td>
				)
			}
		}
		else {
			if(type == "Name") {
				return (
						<td><Link to={"carts/" + String(this.props._id)}>{item}</Link></td>
				);		
			}
			if(type == "Users") {
				return (
					<td>{item.join(', ')}</td>
				);
			}
			else {
					return (
						<td>{item}</td>
				);				
			}		
		}
	}

	renderActionSection() {
		if(this.state.isEditing) {
			return (
				<td>
					<button onClick={this.onSaveClick.bind(this)}>Save</button>
					<button onClick={this.onCancelClick.bind(this)}>Cancel</button>
				</td>
			);
		}
		else {
			return (
				<td>
					<button onClick={this.onEditClick.bind(this)}>Edit</button>
					<button onClick={this.onDeleteClick.bind(this)}>Delete</button>
				</td>
			);
		}
	}

	render() {
		return (		
			<tr>
				<td>{this.props.date}</td>
				{this.renderCartSection("Name", this.props.name)}
				<td>{this.props.admin}</td>
				{this.renderCartSection("Users", this.props.users)}
				{this.renderActionSection()}
			</tr>		
		)
	}

	onEditClick() {
		this.setState({isEditing: true});
	}

	onCancelClick() {
		this.setState({isEditing: false});
	}

	onAddUser(event, userEmail) {
		event.preventDefault();

		const oldCart = this.props;
		var newCartNameValue = this.refs.editName.value;
		const newCart = {date: oldCart.date, name: newCartNameValue, addUser: userEmail}
		this.props.saveCart(oldCart, newCart);
		this.setState({isEditing: false});
	}

	onRemoveUser(userEmail) {
		const deleteCart = this.props;
		const oldCart = this.props;
		var newCartNameValue = this.refs.editName.value;
		const newCart = {date: oldCart.date, name: newCartNameValue, removeUser: userEmail}
		this.props.saveCart(oldCart, newCart);
		this.setState({isEditing: false});
	}

	onSaveClick(event) {
		event.preventDefault();

		const oldCart = this.props;
		var newCartNameValue = this.refs.editName.value;
		var addedUser = this.refs.editUsers.value;
		const newCart = {date: oldCart.date, name: newCartNameValue, users: addedUser}
		this.props.saveCart(oldCart, newCart);
		this.setState({isEditing: false});
	}

	onDeleteClick() {
		const deleteCart = this.props;
		this.props.deleteCart(deleteCart);
	}

	// onAddUser(event, email) {
	// 	event.preventDefault();
	// 	const oldCart = this.props;
	// 	var newCartNameValue = this.refs.editName.value;
	// 	const newCart = {date: oldCart.date, name: newCartNameValue, users: email}
	// 	this.props.saveCart(oldCart, newCart);
	// 	this.setState({isEditing: false});
	// }

	// onRemoveUser() {
	// 	const deleteCart = this.props;
	// 	this.props.deleteCart(deleteCart);
	// }
}