import dispatcher from "../dispatcher";

export function createCart(name) {
	const type = "CREATE_CART";
	dispatcher.dispatch({
		type: type,
		name: name
	});
}

export function saveCart(oldCart, newCart) {
	const type = "SAVE_CART";
	dispatcher.dispatch({
		type: type,
		oldCart: oldCart,
		newCart: newCart
	});
}

export function deleteCart(cart) {
	const type = "DELETE_CART";
	dispatcher.dispatch({
		type: type,
		cart: cart
	});
}