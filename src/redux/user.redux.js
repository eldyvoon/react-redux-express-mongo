import axios from 'axios'
import { getRedirectPath } from '../util'

const AUTH_SUCESS = 'AUTH_SUCESS'
const AUTH_FALSE = 'AUTH_FALSE'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'
const LOGOUT = 'LOGOUT'

const initState = {
	redirectTo: '',
	isAuth: false,
	msg: '',
	user: '',
	type: ''
}

//reducers
export function user(state=initState, action) {
	switch(action.type){
		case AUTH_SUCESS:
			return {
				...state,
				...action.payload,
				msg: '',
				isAuth: true,
				redirectTo: getRedirectPath(action.payload)
			}
		case LOAD_DATA:
		//console.log(getRedirectPath(action.payload))
			return {...state, ...action.payload, redirectTo: getRedirectPath(action.payload)}
		case AUTH_FALSE:
			return {...state, redirectTo: '/login'}
		case ERROR_MSG:
			return { 
				...state, 
				msg: action.msg, 
				isAuth: false 
			}
		case LOGOUT:
			return {
				...initState,
				redirectTo: '/login'
			}
		default:
			return state
	}
}

//actiosn
function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function register({user,pwd,type}){
	if(!user) {
		return errorMsg('Username cannot be blank!')
	}

	if(!pwd) {
		return errorMsg('Password cannot be blank!')
	}

	return dispatch=>{
		axios.post('/user/register', {user,pwd,type})
			.then(res=>{
				if(res.status===200&&res.data.code===0){
					dispatch({
						type: AUTH_SUCESS, 
						payload:{user,pwd,type}})
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function login({user,pwd}){
	if(!user) {
		return errorMsg('Username cannot be blank!')
	}

	if(!pwd) {
		return errorMsg('Password cannot be blank!')
	}

	return dispatch=>{
		axios.post('/user/login', {user,pwd})
			.then(res=>{
				if(res.status===200&&res.data.code===0){
					dispatch({
						type:AUTH_SUCESS,
						payload: res.data.data
					})
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function getInfo(){
	return dispatch=>{
		return axios.get('/user/info')
			.then(res=>{
				if(res.status===200&&res.data.code===0){
					return dispatch({
						type:LOAD_DATA,
						payload: res.data.data
					})
				}else{
					dispatch({type: AUTH_FALSE})
				}
			})
	}
}

export function updateInfo(data){
	return dispatch=>{
		axios.post('/user/update', data)
			.then(res=>{
				if(res.status===200&&res.data.code===0){
					dispatch({
						type:AUTH_SUCESS,
						payload: res.data.data
					})
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function logoutSubmit(){
	return {type: LOGOUT}
}