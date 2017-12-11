import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@connect(state=>state.chat)
@withRouter
class NavLinkBar extends Component {

	static PropTypes = {
		data: PropTypes.array.isRequired
	}

	render() {
		const navList = this.props.navList.filter(v=>!v.hide)
		const { pathname } = this.props.location

		return(
			<TabBar>
				{navList.map(v=>{
						return (
							<TabBar.Item
								badge={v.path==='/msg'?this.props.unread:0}
								key={v.path}
								title={v.text}
								icon={{uri: require(`../../images/${v.icon}.png`)}}
								selectedIcon={{uri: require(`../../images/${v.icon}-active.png`)}}
								selected={v.path===pathname}
								onPress={()=>{
									this.props.history.push(v.path)
								}}
							>
							</TabBar.Item>
						)
					}
				)}
			</TabBar>
		)
	}
	
}

export default NavLinkBar