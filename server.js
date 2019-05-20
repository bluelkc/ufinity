const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api/api')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api)

const port = 3000
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})

module.exports = app;