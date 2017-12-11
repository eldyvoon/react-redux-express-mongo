import axios from 'axios'

import io from 'socket.io-client'
const socket = io('ws://localhost:3001')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg: [],
	users: {},
	unread: 0
}

export function chat(state=initState, action){
	switch(action.type){
		case MSG_LIST:

		//to 5a21957d100fe65395df009e
		//from 5a222737efa02565c93d9ef7
		//console.log((action.payload.chatmsg).filter(v=>!v.read))

		//console.log(action.payload.userid)
			return {
				...state, 
				chatmsg: action.payload.chatmsg, 
				unread: (action.payload.chatmsg || []).filter(v=>!v.read&&v.to===action.payload.userid).length,
				users: action.payload.users
			}
		case MSG_RECV:
			const n = action.payload.to===action.userid ? 1 : 0
			return { 
				...state, 
				chatmsg:[...state.chatmsg, action.payload], 
				unread:state.unread+n
			}
		case MSG_READ:
			const {num, from} = action.payload
			return { 
				...state, 
				chatmsg: state.chatmsg.map(v=>({...v, read:v.from===from?true:v.read})), 
				unread: state.unread-num 
			}
		default:
			return state
	}
}

export function getMsgList(){
	return (dispatch, getState)=>{

		axios.get('/user/getmsglist')
		.then(res=>{
			if(res.status===200 && res.data.code===0){
				const userid = getState().user._id

				dispatch({
					type:MSG_LIST, 
					payload:{
						userid,
						chatmsg: res.data.data, 
						users:res.data.users
					}
				})
			}
		})
	}
}

export function recvMsg(from){
	return (dispatch, getState)=>{		
		socket.on('recieve-msg', function(data){
			const userid = getState().user._id
			dispatch({userid, type: MSG_RECV, payload: data})
		})
	}
}

export function readMsg(from){
	return (dispatch, getState)=>{
		axios.post('/user/readmsg',{from})
		.then(res=>{
			const userid = getState().user._id
			if(res.status===200 && res.data.code===0){
				dispatch({
					type: MSG_READ, 
					payload:{
						userid,
						from,
						num: res.data.num
					}
				})
			}
		})
	}
}



export function sendMsg({from, to, msg}){
	return dispatch=>{
		socket.emit('send-msg', {from, to, msg})
	}
}