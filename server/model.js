const mongoose = require('mongoose')
const DB_URL = 'mongodb://admin:123456@ds125146.mlab.com:25146/react-redux-express-mongo'
mongoose.connect(DB_URL)

const models = {
	user: {
		user: {type: String, require: true},
		pwd: {type: String, require: true},
		type: {type: String, require: true},
		avatar: {type: String},
		desc: {type: String},
		title: {type: String},
		company: {type: String},
		salary: {type: String}
	},
	chat: {
		chatid: {type:String, require:true},
		read: {type:Boolean, default: false},
		from: {type: String, require: true},
		to: {type: String, require: true},
		content: {type: String, require: true},
		create_time: {type: Number, default: new Date().getTime()}
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name){
		return mongoose.model(name)
	}
}