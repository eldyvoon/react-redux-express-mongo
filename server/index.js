const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan  = require('morgan')

const userRouter = require('./user')

//socket io config
const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./model')
const Chat = model.getModel('chat')

io.on('connection', function(socket){
	socket.on('send-msg', function(data){
		const {from, to, msg} = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid, from, to, content:msg}, function(err, doc){
			//console.log(doc)
			io.emit('recieve-msg', doc)
		})
	})
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use(morgan('combined'))

app.use('/user', userRouter)

server.listen(3001, () => console.log('Server is listening on port 3001'))