import React from 'react'
import _ from 'lodash'

export default class CartsUsersListAdd extends React.Component {
	render() {
		return (
			<li>
				<form onSubmit={this.onAddUser.bind(this)}>
					<table>
						<tbody>
							<tr>
								<td><input type="text" placeholder="user's email" ref={"addUsers"} /></td>
								<td><button>Add</button></td>
							</tr>
						</tbody>
					</table>
				</form>
			</li>
		)
	}


	onAddUser(event) {
		event.preventDefault();

		var addedUser = this.refs.addUsers.value;

		this.props.addUser(event, addedUser);
		this.setState({isEditing: false});
	}
}