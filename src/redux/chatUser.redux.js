import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initState = {
	userlist:[]
}

//reducers
export function chatUser(state=initState, action){
	switch(action.type){
		case USER_LIST:
			return {...state, userlist: action.payload}
		default:
			return state
	}
}

//actions
function userList(data){
	return {type: USER_LIST, payload: data}
}

export function getUserList(type){
	return dispatch=>{
		return axios.get('/user/list?type='+type)
			.then(res=>{
				if(res.status===200&&res.data.code===0){
					return dispatch(userList(res.data.data))
				}
			})
	}
}