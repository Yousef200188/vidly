const winston = require('winston')
const express = require('express');
const { level } = require('winston');
const app = express()



require('./startUp/logging')();
require('./startUp/routes')(app);
const logger = require('./startUp/logger');
require('./startUp/db')();
require('./startUp/config')();
require('./startUp/validation')();
require('./startUp/prod')(app);

app.listen(3000, () =>{logger.info(`Connected on Port : ${3000} `)})
module.exports = app



// const v = {I:1,v:5,x:10,L:50,C:100,D:500,M:1000}
// const s = 'III'
// let x = 0

//     for( n in s){

//  x+=v[s[n]]
//     }
//     console.log(x)
