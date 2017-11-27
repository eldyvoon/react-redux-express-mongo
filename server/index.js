const express = require('express')
const app = express()

app.get('/user', (req, res) => res.json({'name':'James'}))

app.listen(3001, () => console.log('Server is listening on port 3001'))