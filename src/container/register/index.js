import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { register } from '../../redux/user.redux'
import myForm from '../../component/myForm'

@myForm
@connect(
	state=>state.user,
	{register}
)
class Register extends Component {

	componentDidMount() {
		this.props.handleChange('type', 'talent')
	}
	
	register() {
		this.props.history.push('/register')
	}

	handleRegister(){
		this.props.register(this.props.state)
	}

	render() {
		const RadioItem = Radio.RadioItem
		return(
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:''}
				<Logo />
				{this.props.msg?<p className="error-msg">{this.props.msg}</p>:''}
				<List>
					<InputItem 
						onChange={(v=>this.props.handleChange('user',v))}
					>Username</InputItem>
					<InputItem 
						type="password"
						onChange={(v=>this.props.handleChange('pwd',v))}
					>Password</InputItem>
					<RadioItem 
						checked={(this.props.state || '').type==='talent'}
						onChange={()=>this.props.handleChange('type','talent')}
					>
						Talent
					</RadioItem>
					<RadioItem 
						checked={(this.props.state || '').type==='boss'}
						onChange={()=>this.props.handleChange('type','boss')}
					>
						Boss
					</RadioItem>
					<WhiteSpace />
					<WhiteSpace />
					<Button type='primary' onClick={() => this.handleRegister()}>Register</Button>
				</List>
			</div>
		)		
	}
}

export default Register