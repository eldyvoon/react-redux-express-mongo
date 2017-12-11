import React, { Component } from 'react'
import Logo from '../../component/logo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import myForm from '../../component/myForm'

@myForm
@connect(
	state=>state.user,
	{login}
)
class Login extends Component {
	
	login() {
		this.props.login(this.props.state)
	}

	render() {
		return(
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:''}
				<Logo />
				{this.props.msg?<p className="error-msg">{this.props.msg}</p>:''}
				<WingBlank>
					<List>
						<InputItem onChange={v=>this.props.handleChange('user',v)}>Username</InputItem>
						<WhiteSpace />
						<InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>Password</InputItem>
					</List>
					<WhiteSpace />
					<WhiteSpace />
					<Button type='primary' onClick={() => this.login()} >
						Login
					</Button>
					<WhiteSpace />
					
					<Link to='/register'>
						<Button type='primary'>
							Register
						</Button>
					</Link>
				</WingBlank>
			</div>
		)		
	}
}

export default Login