var express = require('express')
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var router = express.Router();

app.set('case sensitive routing', true);
// url 상에서 대소문자 구문




// var corsOptions={
//     origin: 'http://localhost:300',
//     creadentials: true
// }

app.use('/static', express.static(__dirname + '/public'));
app.use(cors())
app.use(express.json())
app.use(logger('tiny')) // Logger 설정


const CONNECT_URL = 'mongodb://localhost:27017/mydbname'
 mongoose.connect(CONNECT_URL, { // Mongo DB 서버 연결 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("mongodb connected ...")) 
  .catch(e => console.log(`failed to connect mongodb: ${e}`))

// app.get('/users/:userId([a-z]{4})', (req, res) =>{
//     console.log(req.params.usesId)
//     res.send(`user id ${req.params.userId} found successfully!`)
// })

// app.get('/users/:name/comments',(req, res, next) => {
//     if(req.params.name !=="syleemomo"){
//         //권한없음 처리 페이지
//         res.status(401).send("you are not authorized to this page !")
//     }
//     next()
//     },
//     (req, res) => {
//         //댓글 수정 페이지를 크라이언트로 전송
//         res.send("this is page to update your comments!")
//     }   
// )

// const blockFirstUser = (req, res, next)=>{
//     if(req.params.name === "kim"){
//         res.status(401).send("you are not authorized to this page")
//     }
//     next()
// }
// const blockSecondUser = (req, res, next)=>{
//     if(req.params.name === "park"){
//         res.status(401).send("you are not authorized to this page")
//     }
//     next()
// }
// const allowThisUser = (req,res) =>{
//     // 홈페이지를 클아이언트로 전송
//     res.send("you can see this home page !")
// }

// app.get("/home/users/:name", [
//     blockFirstUser,
//     blockSecondUser,
//     allowThisUser
// ])

// app.get('/chance',(req, res, next) => {
//     if(Math.random() > 0.5)return next()
//     res.send("first one")
// })
// app.get('/chance',(req, res) =>{
//     res.send("second one")
// })

// app.get("/fruits/:name",(req,res,next) =>{
//     if(req.params.name !=="apple") return next()
//     res.send("[logic 1] you choose apple for your favorite fruit !")
// },
// (req, res, next)=>{
//     if(req.params.name !=="banana")return next()
//     res.send("[logic2] you choose banana for your facvorite fruit !")
// },
// (req, res)=>{
//     res.send(`[logic 3] you choose ${req.params.name} for your facorite fruit !`)
// }
// )

// app.get("/shirts",(req, res) =>{
//     res.send(`feature - color : ${req.query.color}/size : ${req.query.size}`)
// })

// app.get('/hello',(req,res)=>{
//     res.send(`<html>
//                 <head>
//                 </head>
//                 <body>
//                     <h1> Hello world !</h1>
//                     <input type="button" value="Submit"/>
//                 </body>
//             </html>`)
// })

// app.get('/hello',(req, res)=>{
//     res.json({ user:"syleemomo",msg:"hello!"})
// })

// app.get("/google",(req, res)=>{
//     res.redirect("https://google.com")
// })

// app.get('/hello',(req,res)=>{
//     console.log(__dirname)
//     res.sendFile(__dirname+'/public/index.html')
// })

// app.get('/home',(req,res)=>{
//     console.log(__dirname)
//     res.sendFile(__dirname+'/public/home.html')
// })

// app.get('/detail',(req,res)=>{
//     console.log(__dirname)
//     res.sendFile(__dirname+'/public/detail.html')
// })

router.use(function timeLog(req, res, next){
    console.log('Time:', Date.now())
    next();
});

router.get('/',function(req, res){
    res.send('Birds home page')
});

router.get('/about',function(req, res){
    res.send('About birds');
});

module.exports = router;

// var birds = require('./birds')
// app.use('/birds',birds);

app.post('/users', (req, res) => {
    console.log(req.body.newUser)
    res.json(`new user - ${req.body.newUser.name} created!`)
})

app.put("/users/:id",(req,res)=>{
    console.log(req.body.UserInfoToUpdate)
    //데이터베이스에서 id 값을 사용자 검색후 업테이트(몽고DB)
    res.send(
        `uesr ${req.params.id} updated with payload ${req.body.UserInfoToUpdate.name            
        }!`
    )
})

app.delete("/users/:id",(req, res) => {
    console.log(req.params.id)
    //데이터베이스에서 id 에 해당하는 사용자 조회 후 제거
    res.send(`user${req.params.id}removed!`)
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