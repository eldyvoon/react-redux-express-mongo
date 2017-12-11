import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {

	static PropTypes = {
		selectAvatar: PropTypes.func, isRequired: true
	}

	constructor(props) {
		super(props);
		this.state = { avatarList: [] }
	}

	componentDidMount() {
		const avatarList = 'dog,cat,deer,cow,bear,bee'
							.split(',')
							.map(v => ({
								icon: require(`../../images/${v}.png`),
								text: v,
								active: false
							}))
		this.setState({avatarList})
	}

	setActive(selectedIndex) {

		const { avatarList } = this.state

		this.setState({
			avatarList: avatarList.map((o, i) => {
				return i === selectedIndex ? {...o,active: true} : {...o,active:false}
			})
		})
	}

	render() {

		const { avatarList } = this.state
		
		return(
			<div>
				<List renderHeader="Choose an avatar">
				{avatarList &&
				<Grid 
					activeStyle={false}
					data={avatarList} 
					columnNum={3}
					renderItem={(dataItem, index) => (
				        <div 
				        style={{'background': dataItem.active ? '#eee': '','height':'100%'}}
				        onClick={()=>{
							this.setActive(index)
							this.props.selectAvatar(dataItem.text)
						}}>
				          <img style={{width:30, marginTop:30}} src={dataItem.icon} alt="" />
				          <div>
				            <span>{dataItem.text}</span>
				          </div>
				        </div>
				      )}
				/>}
				</List>
			</div>
		)
	}
}

export default AvatarSelector