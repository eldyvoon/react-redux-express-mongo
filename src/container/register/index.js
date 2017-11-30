import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			type:'talent'
		}
	}
	
	register() {
		this.props.history.push('/register')
	}

	render() {
		const RadioItem = Radio.RadioItem
		return(
			<div>
				<Logo />
				<List>
					<InputItem>Username</InputItem>
					<InputItem>Password</InputItem>
					<InputItem>Confirm Password</InputItem>
					<RadioItem checked={this.state.type==='talent'}>
						Talent
					</RadioItem>
					<RadioItem checked={this.state.type==='boss'}>
						Boss
					</RadioItem>
					<WhiteSpace />
					<WhiteSpace />
					<Button type='primary'>Register</Button>
				</List>
			</div>
		)		
	}
}

export default Register