// the export module is caught by the below statement thrown by db.js
const connectMongo = require('./db');

const express = require('express')

// for connection to mongodb compass
connectMongo();

const app = express()

const port = 5000


// Middleware for the sake of request body 
app.use(express.json());

// Available routes
app.use('/api/auth',require('./routes/auth'));

app.use('/api/notes',require('./routes/notes'));





// app.get('/', (req, res) => {
//   res.send('Hello Yogesh!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
