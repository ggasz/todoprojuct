const express = require('express')
const TodoRouter = express.Router()
const Todo = require('../models/Todo')

TodoRouter.get('/', async (req, res) => {
    const todos = await Todo.find() // await ,async 사용이유 find로 찾기도 전에 아래 코드 를 실행하기 때문에 
    console.log(todos)
    res.json({status:200, todos})
})

TodoRouter.get('/:id',(req, res)=>{
   Todo.findById(req.params.id,(err,todo)=>{
       if(err) throw err;
       res.json({status: 200, todo})
   })
})

TodoRouter.post('/',(req, res)=>{    
    Todo.findOne({ name: req.body.name, done: false}, async(err,todo)=>{
        if(err) throw err;
        if(!todo){
            const newTodo = new Todo(req.body);
            await newTodo.save().then( ()=>{
                res.json({status:201, msg:'new todo created in db!', newTodo})
            })
        }else{//생성하려는 할일과 같은 이름이고 아직 끝내지않을 할일이 이미 데이터베이스에 존재하는 경구
            const msg = 'this todo already exists in db !'
            console.log(msg)
            res.json({status: 204, msg})
        }
    })
})

TodoRouter.put('/:id',(req, res)=>{
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true},(err,todo)=>{
        if(err) throw err;
        res.json({status: 204, msg : `todo${req.params.id} updated in db!`, todo})
    })
})

TodoRouter.delete('/:id',(req, res)=>{
    Todo.findByIdAndDelete(req.params.id,(err, todo)=>{
        if(err) throw err;
        res.json({ status: 204, msg:`todo ${req.params.id} removde in db!`})
    })
})

module.exports = TodoRouter;