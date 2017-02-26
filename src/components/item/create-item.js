import React from 'react'

export default class ItemCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null
		}
	}

	renderError() {
		if (!this.state.error) {
			return null;
		}
		else {
			return <div style={{ color: 'red' }}>{this.state.error}</div>
		}
	}
	render() {
		return (
			<form onSubmit={this.handleCreate.bind(this)}>
				<input type="item" placeholder="item" ref="itemInput" />
				<input type="quantity" placeholder="quantity" ref="quantityInput" />
				<input type="note" placeholder="note" ref="noteInput" />	
				<button bsSize="large">Add</button>	
				{this.renderError()}	
			</form>
		)
	}

	handleCreate(event) {
		event.preventDefault();
		var item = this.refs.itemInput.value;
		var quantity = this.refs.quantityInput.value;
		var note = this.refs.noteInput.value;
		
		var validateInput = this.validateInput(item);

		if (validateInput) {
			this.setState({ error: validateInput });
			return
		}
		this.setState({ error: null });

		this.props.createItem(item, quantity, note);

		this.refs.itemInput.value = '';
		this.refs.quantityInput.value = '';
		this.refs.noteInput.value = '';
	}

	validateInput(item) {
		if (!item){
			return 'Please enter an item.';
		} else if (_.find(this.props.items, cart_item => cart_item.item === item)) {
			return 'Item already exists.';
		} else {
			return null;
		}
	}
}