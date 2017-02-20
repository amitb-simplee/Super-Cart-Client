import React from 'react'

export default class CartsItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false
		};
	}

	renderCartSection() {
		console.log(this.props);
		if (this.state.isEditing) {
			return (
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input type="text" defaultValue={this.props.name} ref="editName" />

					</form>
				</td>
			)
		}
		else {
			return (
					<td> {this.props.name} </td>
			);				
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
				{this.renderCartSection()}
				<td>{this.props.admin}</td>
				<td>{this.props.users}</td>
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

	onSaveClick(event) {
		event.preventDefault();

		const oldCart = this.props;
		var newCartNameValue = this.refs.editName.value;

		const newCart = {date: oldCart.date, name: newCartNameValue, admin: oldCart.name, users: oldCart.users}

		this.props.saveCart(oldCart, newCart);
		this.setState({isEditing: false});
	}

	onDeleteClick() {
		const deleteCart = this.props;
		this.props.deleteCart(deleteCart);
	}
}