const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : { type: String, requird: true, trim: true},
    age : { type: Number, requird: true, trim: true},
    email :{ type: String, requird: true, trim: true},
    todos : [{type: String, requird:true, trim: true}]
})

// const user = new User({
//     todos:["todo",""]
// })
// try{
//     await user.save()
// }catch(){
//     console.log()
// }

const Todo = mongoose.model('User',userSchema)
module.exports = User;