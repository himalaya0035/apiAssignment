const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const swaggerDocs = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method);
    next();
})


app.use('/api/user',userRoutes)

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

mongoose.connect(MONGO_URI)
.then(() => {
    app.listen(PORT,() => {
        console.log("Connected to db and server is listening on port " + PORT)
    })
}).catch(e => console.log(e))

