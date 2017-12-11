const express = require('express')
const router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const utils = require('utility')
const _filter = {pwd: 0, __v: 0} // remove sensitive field

router.get('/list', function(req, res) {
	const type = req.query.type
	User.find({type: type}, function(err, user) {
		return res.json({code:0, data:user})
	})
})

router.post('/register', function(req, res) {
	const {user, pwd, type} = req.body
	User.findOne({user:user}, function(err, doc){
		if(doc) {
			return res.json({code:1, msg:'username is taken!'})
		}

		const userModel= new User({user,type,pwd:md5Pwd(pwd)})

		userModel.save(function(userErr, createdUser){
			if(userErr) {
				return res.json({code:1, msg:'something is wrong!'})
			}
			res.cookie('userid', createdUser._id)
			const {user,type,_id} = createdUser
			return res.json({code:0, data:{user,type,_id}})
		})
	})
})

router.post('/login', function(req, res) {
	const {user, pwd} = req.body
	User.findOne({user:user, pwd:md5Pwd(pwd)}, _filter ,function(err, doc){
		if(doc) {
			res.cookie('userid', doc._id)
			return res.json({code:0, data:doc})
		}else{
			return res.json({code:1, msg:'Invalid login!'})
		}
	})
})

router.get('/info', function(req, res) {
	const {userid} = req.cookies
	if(!userid){
		return res.json({code: 1})
	}
	User.findOne({_id:userid}, _filter, function(err, doc){
		if(err) {
			return res.json({code:1, msg:'something is wrong!'})
		}
		if(doc){
			return res.json({code:0, data:doc})
		}
	})
})

router.post('/update', function(req, res) {
	const {userid} = req.cookies
	if(!userid) {
		return res.json({code:1})
	}
	User.findByIdAndUpdate(userid, req.body, function(err, doc){
		return res.json({
			code:0,
			data: Object.assign({}, {
				user: doc.user,
				type: doc.type
			}, req.body)
		})
	})
})

router.get('/getmsglist', function(req, res) {
	const userid = req.cookies.userid

	User.find({}, function(err, userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:userid},{to:userid}]}, function(err, doc){
			if(!err){
				return res.json({code: 0, data: doc, users:users})
			}
		})
	})
})

router.post('/readmsg', function(req, res) {
	const userid = req.cookies.userid
	const { from } = req.body

	Chat.update({from, to:userid}, {'$set':{read:true}},{multi:true},function(err, doc){
		if(!err){
			return res.json({code: 0, num: doc.nModified})
		}
		res.json({code:1, msg:'failed to update'})
	})
	
})

function md5Pwd(pwd){
	const salt = 'SECRET_KEY_@#2!@32'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = router