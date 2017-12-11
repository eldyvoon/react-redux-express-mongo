import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import reducer from './reducer'

import './config'

import Login from './container/login'
import Register from './container/register'
import Talentinfo from './container/talentinfo'
import Bossinfo from './container/bossinfo'

import AuthRoute from './component/authroute'
import Dashboard from './component/dashboard'

import isMobile from 'is-mobile'

import './index.css'

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));

const MobileWrap = props => (
	<div className='mobile-wrap'>{props.children}</div>
)

const renderApp = () => (
	<div>
		<AuthRoute></AuthRoute>
		<Switch>
			<Route path='/login' component={Login}></Route>
			<Route path='/register' component={Register}></Route>
			<Route path='/bossinfo' component={Bossinfo}></Route>
			<Route path='/talentinfo' component={Talentinfo}></Route>
			<Route path='/' component={Dashboard}></Route>
		</Switch>
	</div>
)

ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				{!isMobile() && <MobileWrap>
					{renderApp()}
				</MobileWrap>}

				{isMobile() && renderApp()}
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)