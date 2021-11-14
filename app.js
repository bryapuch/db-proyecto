const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Helo ld')
})
 
app.listen(3000)
