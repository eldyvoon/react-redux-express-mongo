import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { NavBar, InputItem, TextareaItem, List, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector'
import { updateInfo } from '../../redux/user.redux'

@connect(
	state=>state.user,
	{updateInfo}
)
class Bossinfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			avatar: '',
			title: '',

		}
	}

	handleChange(key, val){
		this.setState({
			[key]: val
		})
	}

	render() {
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo

		return(
			<div>
				{redirect&&redirect!==path?<Redirect to={this.props.redirectTo} />:''}
				<NavBar
					mode="dark"
				>Boss Profile</NavBar>
				<List>
					<AvatarSelector selectAvatar={imgname=>{
						this.setState({avatar: imgname})
					}}
					selectedAvatar={this.state.avatar}
					></AvatarSelector>
					<InputItem onChange={v=>this.handleChange('title',v)}>
						Position
					</InputItem>
					<TextareaItem 
						onChange={v=>this.handleChange('desc',v)}
						rows={3}
						autoHeight
						title='Pitching'
					>
					</TextareaItem>
					<Button type='primary' 
						onClick={()=>this.props.updateInfo(this.state)}>
						Save
					</Button>
				</List>
			</div>
		)
	}
}

export default Bossinfo