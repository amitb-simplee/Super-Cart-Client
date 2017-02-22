import React from 'react'

export default class CartItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false
		};
	}

	renderItemSection(type, item) {
		const itemStyle = {
			color: this.props.checked ? 'green' : 'red',
			cursor: 'pointer'
		};
		
		if (this.state.isEditing) {
			return (
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input type="text" defaultValue={item} ref={"edit"+type} />
					</form>
				</td>
			)
		}
		else {
			return (
					<td style={itemStyle}
						onClick={this.props.toggleItem.bind(this, item)}>
						{item}
					</td>
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
				{this.renderItemSection("Item", this.props.name)}
				{this.renderItemSection("Quantity", this.props.quantity)}
				{this.renderItemSection("Note", this.props.note)}
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

		const oldItem = this.props;
		
		var newItemValue = this.refs.editItem.value;
		var newQuantityValue = this.refs.editQuantity.value;
		var newNoteValue = this.refs.editNote.value;

		const newItem = {name: newItemValue, quantity: newQuantityValue, note: newNoteValue}

		this.props.saveItem(oldItem, newItem);
		this.setState({isEditing: false});
	}

	onDeleteClick() {
		const deleteItem = this.props;
		this.props.deleteItem(deleteItem);
	}
}