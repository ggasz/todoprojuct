const express = require('express')
const router = express.Router()
const todo = require('./todo')
const word = require('./word')

//url 추가
router.use('/todos',todo)
router.use('/words',word) // /api/word

module.exports = router