import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Login extends Component {
	
	register() {
		this.props.history.push('/register')
	}

	render() {
		return(
			<div>
				<Logo />
				<WingBlank>
					<List>
						<InputItem>User</InputItem>
						<WhiteSpace />
						<InputItem>Password</InputItem>
					</List>
					<WhiteSpace />
					<Button type='primary'>Login</Button>
					<WhiteSpace />
					<Button onClick={() => this.register()} type='primary'>
						Register
					</Button>
				</WingBlank>
			</div>
		)		
	}
}

export default Login