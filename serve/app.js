const express = require('express')
const cookieParser = require('cookie-parser');
//const bodyParser=require('body-parser')


const server = express()
server.use(express.json({ limit: '50mb' }))
//引入中间件
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cookieParser());
server.use('/books', require('./router/books'));
server.use('/account', require('./router/account'));
server.use('/words', require('./router/word'));
server.use('/move', require('./router/move'));
//server.use(express.static('../boke/dist'))
//server.use(express.static('./upload'));
server.listen(8080, () => {
    console.log('server is running at port 8080')
})
