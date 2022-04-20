const express = require('express')
const routes = require('./routes/');
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3332, () => {
  console.log('🚀 Server started on port=3333')
})