import React from 'react';
import { render } from 'react-dom';
import App from 'components/app';
import Cart from 'components/cart/cart';
import Carts from 'components/carts/carts';
import User from './components/user/user'
import { Router, Route, hashHistory } from 'react-router'

// render(<App />, document.getElementById('app'));

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/carts" component={Carts}/>
    <Route path="/cart" component={Cart}/>
    <Route path="/user" component={User}/>
  </Router>
), document.getElementById('app'))