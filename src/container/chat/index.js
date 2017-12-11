import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import {getChatId} from '../../util'
@connect(
	state=>state,
	{getMsgList , sendMsg, recvMsg, readMsg}
)
class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {text:''}
	}

	componentDidMount() {
		if(!(this.props.chat || []).chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
	}

	componentWillUnmount() {
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}

	handleSubmit(){
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text

		this.props.sendMsg({from, to, msg})
		this.setState({text:''})
	}


	render(){

		const userid = this.props.match.params.user
		const Item = List.Item

		const users = this.props.chat.users
		if(!users[userid]){
			return null
		}

		const chatid = getChatId(userid, this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)

		return(
			<div id='chat-page'>
				<NavBar mode='dark'
					icon={<Icon type='left' />}
					onLeftClick={() => {
						this.props.history.goBack()
					}}
				>
					{users[userid].name}
				</NavBar>

				{(chatmsgs || []).map(v=>{
					const avatar = require(`../../images/${users[v.from].avatar}.png`)
					
					return v.from===userid?(
						<List key={v._id}>
							<Item
								thumb={avatar}
							>{v.content}</Item>
						</List>
					):(
						<List key={v._id}>
							<Item extra={<img alt='avatar' src={avatar} />} className='chat-me'>{v.content}</Item>
						</List>
					)
				})}

				<div className='stick-footer'>
					<List>
						<InputItem
							className='msg-input'
							value={this.state.text}
							placeholder="type here"
							extra={<span className='sendBtn' onClick={()=>this.handleSubmit()}>Send</span>}
							onChange={v=>this.setState({text: v})}
						></InputItem>
					</List>
				</div>
			</div>
		)
	}
}

export default Chat