import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
	state=>state
)
class Msg extends Component {

	getLastItem(arr){
		return arr[arr.length-1]
	}
	
	render(){

		const { Item } = List
		const { Brief } = Item

		const userid = this.props.user._id
		const userinfo = this.props.chat.users

		const mgsGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			mgsGroup[v.chatid] = mgsGroup[v.chatid] || []
			mgsGroup[v.chatid].push(v)
		})

		const chatList = Object.values(mgsGroup).sort((a,b)=>{
			const a_last = this.getLastItem(a).create_time
			const b_last = this.getLastItem(b).create_time
			return b_last - a_last
		})

		return(<div>
			
				{chatList.map(v=>{

					const item = this.getLastItem(v)
					const targetid = v[0].from===userid?v[0].to:v[0].from
					const unreadNum = v.filter(v=>!v.read&&v.to===userid).length

					if(!userinfo[targetid]){
						return null
					}
					
					const name = (userinfo[targetid] || '').name
					const avatar = (userinfo[targetid] || '').avatar

					return(
						<List key={v._id}>
							<Item
								extra={<Badge style={{marginBottom: 3}} text={unreadNum}></Badge>}
								thumb={require(`../../images/${avatar}.png`)}
								arrow="horizontal"
								onClick={()=>{
									this.props.history.push(`/chat/${targetid}`)
								}}
							>
								{item.content}
								<Brief>{name}</Brief>
							</Item>
						</List>
					)
				})}
			
		</div>)
	}
}

export default Msg