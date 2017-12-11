import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getInfo } from '../../redux/user.redux'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'

@withRouter
@connect(state=>state.user,
	{getInfo}
)
class AuthRoute extends Component {
	componentDidMount() {

		const publicList = ['/login', '/register']
		const { pathname } = this.props.location

		//if user hit login or register route, skip
		if(publicList.indexOf(pathname)>-1){
			return false
		}

		const userid = browserCookie.get('userid')

		if(userid){
			this.props.getInfo()
				.then(res=> {
					this.props.history.push(this.props.redirectTo)
				})
		}else{
			this.props.history.replace('/login')
		}
		
	}

	render(){
		return <div></div>
	}
}

export default AuthRoute