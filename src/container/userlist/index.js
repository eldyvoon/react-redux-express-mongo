import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class Userlist extends Component {
	static propTypes = {
		userlist: PropTypes.array.isRequired
	}

	render(){
		return(
			<WingBlank>
				<WhiteSpace />
				{this.props.userlist.map(v=>(
					v.avatar && <div key={v.user}><Card onClick={()=>{this.props.history.push(`/chat/${v._id}`)}} key={v._id}>
						<Card.Header
							title={v.user}
							thumb={require(`../../images/${v.avatar}.png`)}
							thumbStyle={{width: 50}}
							extra={<span>{v.title}</span>}
						>
						</Card.Header>
						<Card.Body>
							{v.company && <div>{v.type==='talent' ? `Company: ${v.company}`:''}</div>}
							{v.salary && <div>{v.type==='talent' ? `Salary: ${v.salary}`:''}</div>}
							{v.desc && v.desc.split('\n').map(v=><div key={v}>{v}</div>)}
						</Card.Body>
					</Card>
					<WhiteSpace />
					</div>
				))}
			</WingBlank>
		)
	}
}

export default Userlist