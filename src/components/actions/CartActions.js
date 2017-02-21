import dispatcher from "../dispatcher";

export function createItem(item, quantity, note) {
	const type = "CREATE_ITEM";
	dispatcher.dispatch({
		type: type,
		item: item,
		quantity: quantity,
		note: note
	});
}

export function saveItem(oldItem, newItem) {
	const type = "SAVE_ITEM";
	dispatcher.dispatch({
		type: type,
		oldItem: oldItem,
		newItem: newItem
	});
}

export function deleteItem(item) {
	const type = "DELETE_ITEM";
	dispatcher.dispatch({
		type: type,
		item: item
	});
}