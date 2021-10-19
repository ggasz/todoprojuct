var express = require('express')
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')

// var corsOptions={
//     origin: 'http://localhost:300',
//     creadentials: true
// }

const CONNECT_URL = 'mongodb://localhost:27017/mydbname'
 mongoose.connect(CONNECT_URL, { // Mongo DB 서버 연결 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("mongodb connected ...")) 
  .catch(e => console.log(`failed to connect mongodb: ${e}`))

app.use(cors())
app.use(express.json())
app.use(logger('tiny')) // Logger 설정

app.get('/hello',(req, res)=>{
    res.send('hello world!')
})

app.use( (err, req, res, next) => { // 서버 내부 오류 처리 
    console.error(err.stack)
    // 서버 내부 오류 처리 로직
    res.status(500).send("something is broken on server !")
 })

app.use( (req, res, next) => { // 사용자가 요청한 페이지가 없는 경우 에러처리
     res.status(200).send("this is page tou see when page don't exist") 
     //404 페이지 전달
})

app.listen(5000,() =>{
    console.log('server is running on port 5000...')
})

// const points = [3,4];
// const app = {}
// app.doubleNums = (points) => {
//     return points.map(p => {
//         return p*p
//     });
// }
// app.sum = (points_doubled) => {
//     let s = 0;
//     points_doubled.forEach(p =>{
//         s += p;
//     })
//     return s;
// }
// app.sq = (s) => {
//     return Math.sqrt(s)
// }

// const pipeline = [app.doubleNums, app.sum, app.sq]

// const result = app.sq(app.sum(app.doubleNums(points)))
// console.log(result)