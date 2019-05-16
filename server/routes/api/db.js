//引入mongoose模块
const mongoose = require('mongoose')

mongoose.connect('', {useNewUrlParser:true})

const userSchema = new mongoose.Schema({
  name: String,
  password: String
},{ collection: 'users' })

const breakfastTable = new mongoose.Schema({
    date: String,
    table: Array
},{ collection: 'breakfasttable' })

const lunchTable = new mongoose.Schema({
    date: String,
    table: Array
},{ collection: 'lunchtable' })

const dinnerTable = new mongoose.Schema({
    date: String,
    table: Array
},{ collection: 'dinnertable' })

const otherTable = new mongoose.Schema({
  date: String,
  table: Array
},{ collection: 'othertable' })

const currentTable = new mongoose.Schema({
  name: String,
  auto: Number,
  currenttable: String,
},{ collection: 'currenttable' })

const Models = {
  User: mongoose.model('User', userSchema),
  breakfastTable: mongoose.model('breakfastTable', breakfastTable),
  lunchTable: mongoose.model('lunchTable', lunchTable),
  dinnerTable: mongoose.model('dinnerTable', dinnerTable),
  currentTable: mongoose.model('currentTable',currentTable),
  otherTable:  mongoose.model('otherTable',otherTable),
}

module.exports = Models