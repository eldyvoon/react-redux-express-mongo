import React, { Component } from 'react'

export default function myForm(Comp) {
	return class WrapperComp extends Component {

		handleChange(key, val){
			this.setState({
				[key]: val
			})
		}

		render(){
			return <Comp handleChange={this.handleChange.bind(this)} state={this.state} {...this.props} />
		}
	}
}