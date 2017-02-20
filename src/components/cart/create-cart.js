import React from 'react'

export default class CartCreate extends React.Component {
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
				<input type="name" placeholder="item" ref="nameInput" />	
				<button>Create</button>	
				{this.renderError()}	
			</form>
		)
	}

	handleCreate(event) {
		event.preventDefault();
		var name = this.refs.nameInput.value;
		
		var validateInput = this.validateInput(name);

		if (validateInput) {
			this.setState({ error: validateInput });
			return
		}
		this.setState({ error: null });

		this.props.createCart(name);

		this.refs.nameInput.value = '';
	}

	validateInput(name) {
		if (!name){
			return 'Please enter a cart name.';
		} else if (_.find(this.props.carts, cart_item => cart_item.name === name)) {
			return 'Cart with the same name already exists.';
		} else {
			return null;
		}
	}

}