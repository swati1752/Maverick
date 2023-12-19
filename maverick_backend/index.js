const express = require('express')
const responseRouter = require('./routers/response')

const app = express()
const port = process.env.PORT||3000
app.use(express.json())

app.use(responseRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})