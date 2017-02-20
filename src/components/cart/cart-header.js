import React from 'react'

export default class CartHeader extends React.Component {
	render() {
		return (		
			<thead>
				<tr>
					<th>Item</th>
					<th>Quantity</th>
					<th>Note</th>
					<th>Action</th>
				</tr>
			</thead>			
		)
	}
}