import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatUser.redux'

import Userlist from '../userlist'

@connect(state=>state.chatUser,
	{getUserList})
class Talent extends Component {
	componentDidMount() {
		this.props.getUserList('boss')
	}
	render(){
		return(
			<Userlist userlist={this.props.userlist} />
		)
	}
}

export default Talent