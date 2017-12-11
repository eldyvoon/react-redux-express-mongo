import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WhiteSpace, Result, List, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
	state=>state.user,
	{logoutSubmit}
)
class Profile extends Component {

	logout(){
		browserCookie.erase('userid')
		const confirmLogout = Modal.alert

		confirmLogout('Logout', 'Confirm to Logout?',[
			{'text':'Cancel'},
			{'text':'Logout', onPress: () => {
				this.props.logoutSubmit()
			}}
		])
	}

	render() {
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief

		return props.user ? (
			<div className="result-example">
			  <WhiteSpace />
			  <Result
			  	img={<img alt='avatar' src={require(`../../images/${this.props.avatar}.png`)} />}
			    title={props.user}
			    message={props.type==='boss'?props.company:props.title}
			  />
			  <WhiteSpace />
			  <List renderHeader={()=>'Introduction'}>
			  	<Item>
			  		{props.title}
			  		{(props.desc || '').split('\n').map(v=><Brief key={v}>{v}</Brief>)}
			  		{props.money && <Brief>Salary: {props.money}</Brief>}
			  	</Item>
			  </List>
			  <WhiteSpace />
			  <List>
			  	<Item onClick={()=>{this.logout()}}>Logout</Item>
			  </List>
			</div>
		): <Redirect to={props.redirectTo} />
	}
}

export default Profile
