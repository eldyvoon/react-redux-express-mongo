import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux'
import NavLinkBar from '../navlink'

import Boss from '../../container/boss'
import Talent from '../../container/talent'
import Profile from '../../container/profile'
import Chat from '../../container/chat'
import Msg from '../../container/msg'

import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
	state=>state,
	{getMsgList, recvMsg}
)
class Dashboard extends Component {

	componentDidMount() {
		if(!(this.props.chat.chatmsg || '').length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
	}

	render() {
		const { user } = this.props
		const { pathname } = this.props.location
		const navList = [
			{
				path: '/talent',
				text: 'Boss',
				icon: 'boss',
				title: 'Boss List',
				component: Talent,
				hide: user.type==='boss'
			},
			{
				path: '/boss',
				text: 'Talent',
				icon: 'talent',
				title: 'Talents List',
				component: Boss,
				hide: user.type==='talent'
			},
			{
				path: '/chat/:user',
				text: 'Messages',
				icon: 'msg',
				title: 'Chat',
				component: Chat,
				hide: true
			},
			{
				path: '/msg',
				text: 'Messages',
				icon: 'msg',
				title: 'Messages List',
				component: Msg,
				hide: false
			},
			{
				path: '/me',
				text: 'Profile',
				icon: 'profile',
				title: 'Profile',
				component: Profile,
				hide: false
			}
		]

		return(
			<div>
				<NavBar
					className={'fixed-header'}
					mode='dark'
				>{(navList.find(v=>v.path===pathname) || {title: ''}).title}
				</NavBar>
				<div style={{marginTop:45}}>
					<Switch>
						{navList.map(v=>{
								return(
									<Route 
										key={v.path} 
										path={v.path}
										component={v.component}>
									</Route>
								)
						})}
					</Switch>
				</div>
				<NavLinkBar navList={navList} />
			</div>
		)
	}
}

export default Dashboard