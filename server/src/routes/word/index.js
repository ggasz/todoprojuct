const express = require('express')
const Wordrouter = express.Router()

const Word = require("../../models/Word");

Wordrouter.route('/(:word)?').get(async(req,res)=>{// 정규표현식사용
    let words = []
    const { word } = req.params
    console.log(word)
    // res.send(word) //이게 존재할경우 아레 send 실행 X
    
    if(word !== "undefined" && word !== undefined ){
        console.log(word)
        words = await Word.find({r_word: word})     
        //데이터베이스에서 쿼리로 단어를 검색        
    }else{
        //데이터베이스에서 전체 단어 검색
        console.log(word)
        console.log(`word database:${Word}`)
        words = await Word.find()        
    }
        res.json({status:200, words})
})  

module.exports = Wordrouter