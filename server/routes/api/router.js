const express = require('express')
const router = express.Router()
const db = require('./db')
const mongodb = require('mongodb')

// 登录
router.post('/api/signin', function (req, res) {
  // req.session.user = req.body.userInfo
  res.send()
})

// 根据用户名获取用户
router.get('/api/getUser/:name', function (req, res) {
  db.User.findOne({ name: req.params.name }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})

//查找选择表更新数据
router.post('/tableList/api/setcurrenttable',function(req,res){
  var ct = req.body.currenttable
  db.currentTable.createCollection(function(err,result){
    db.currentTable.findOne({name: ct.name},function(err,docs){
      if (err){
        if (err) throw err;
        return
      }
      else if (docs == null){
        new db.currentTable(ct).save(function (err) {
          if (err){
            if (err) throw err;
            return
          }
          db.currentTable.updateOne({name:ct.name},{currenttable:ct.tableid, auto:ct.auto},function(err,result){
            if (err){
              if (err) throw err;
              return
            }
          })
        })
      }
      else {
        db.currentTable.updateOne({name:ct.name},{currenttable:ct.tableid,auto:ct.auto},function(err,result){
          if (err){
            if (err) throw err;
            return
          }
        })
      }
    })
    res.send()
  })
})

//删除表
router.post('/tableList/api/deletetable',function(req,res){
  var ct = req.body.table
  if (ct.type == "bf")
  {
    db.breakfastTable.deleteOne({_id: new mongodb.ObjectID(ct.id)},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (ct.type == "lunch"){
    db.lunchTable.deleteOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (ct.type == "dinner"){
    db.dinnerTable.deleteOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (ct.type == "othertable"){
    db.otherTable.deleteOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
    })
  }
})

//获取目前在用表的id //otherTable
router.get('/api/getcurrentid/:type',function(req,res){
  db.currentTable.findOne({name: req.params.type},function(err,docs){
    if (err){
        console.error(err)
        return 
    }
    res.send(docs)
    console.log(docs)
  })
})

//获取目前在用表的id / tableList
router.get('/tableList/api/getcurrentid/:type',function(req,res){
  db.currentTable.findOne({name: req.params.type},function(err,docs){
    if (err){
        console.error(err)
        return 
    }
    res.send(docs)
    console.log(docs)
  })
})

//获取目前在用表的id / table
router.get('/table/api/getcurrentid/:type',function(req,res){
  db.currentTable.findOne({name: req.params.type},function(err,docs){
    if (err){
        console.error(err)
        return 
    }
    res.send(docs)
  })
})

//设置该表是否自动读取日期 / tableList
router.post('/tableList/api/setautoornot',function(req,res){
  var ct = req.body.table
  db.currentTable.updateOne({name:ct.name},{auto:ct.auto},function(err,result){
    if (err){
      if (err) throw err;
      return
    }
  })
  res.send()
})

//获取该表是否自动读取日期 / otherTable
router.get('/api/getautoornot/:type',function(req,res){
  console.log(req.params.type)
  db.currentTable.findOne({name: req.params.type},function(err,docs){
    if (err){
        console.error(err)
        return 
    }
    res.send(docs)
  })
})

//获取该表是否自动读取日期 / table
router.get('/table/api/getautoornot/:type',function(req,res){
  db.currentTable.findOne({name: req.params.type},function(err,docs){
    if (err){
        console.error(err)
        return 
    }
    res.send(docs)
  })
})

//获取该表是否自动读取日期 / tableList
router.get('/tableList/api/getautoornot/:type',function(req,res){
  db.currentTable.findOne({name: req.params.type},function(err,docs){
    if (err){
        console.error(err)
        return 
    }
    res.send(docs)
  })
})

//获取目前在用表 / otherTable
router.get('/api/gettable',function(req,res){
  var ct = req.query
  console.log(ct)
  if (ct.type == "bf")
  {
    db.breakfastTable.findOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
        console.log(err)
        return 
      }
      res.json(docs)
    })
  }
  else if (ct.type == "lunch"){
    db.lunchTable.findOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
        console.log(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (ct.type == "dinner"){
    db.dinnerTable.findOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
        console.log(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (ct.type == "othertable"){
    db.otherTable.findOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
        console.log(err)
        return 
      }
      res.json(docs)
    })
  }
})

//获取目前在用表 / table
router.get('/table/api/gettable',function(req,res){
  var ct = req.query
  console.log(ct)
  if (ct.type == "bf")
  {
    db.breakfastTable.findOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
        console.log(err)
        return 
      }
      res.json(docs)
    })
  }
  else if (ct.type == "lunch"){
    db.lunchTable.findOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
        console.log(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (ct.type == "dinner"){
    db.dinnerTable.findOne({_id: new mongodb.ObjectID( ct.id)},function(err,docs){
      if (err){
        console.log(err)
          return 
      }
      res.json(docs)
    })
  }
})

//获取目前已上传的表
router.get('/tableList/api/gettable/:type',function(req,res){
  if (req.params.type == "bf")
  {
    db.breakfastTable.find({},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (req.params.type == "lunch"){
    db.lunchTable.find({},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (req.params.type == "dinner"){
    db.dinnerTable.find({},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
    })
  }
  else if (req.params.type == "othertable"){
    db.otherTable.find({},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
    })
  }
})

router.post('/api/setcurrenttable',function(req,res){
  var ct = req.body.currenttable
  db.currentTable.createCollection(function(err,result){
    db.currentTable.findOne({name: ct.name},function(err,docs){
      if (err){
        if (err) throw err;
        return
      }
      else if (docs == null){
        new db.currentTable(ct).save(function (err) {
          if (err){
            if (err) throw err;
            return
          }
          db.currentTable.updateOne({name:ct.name},{currenttable:ct.tableid, auto:ct.auto},function(err,result){
            if (err){
              if (err) throw err;
              return
            }
          })
        })
      }
      else {
        db.currentTable.updateOne({name:ct.name},{currenttable:ct.tableid,auto:ct.auto},function(err,result){
          if (err){
            if (err) throw err;
            return
          }
        })
      }
    })
    res.send()
  })
})

router.post('/table/api/setcurrenttable',function(req,res){
  var ct = req.body.currenttable
  db.currentTable.createCollection(function(err,result){
    db.currentTable.findOne({name: ct.name},function(err,docs){
      if (err){
        if (err) throw err;
        return
      }
      else if (docs == null){
        new db.currentTable(ct).save(function (err) {
          if (err){
            if (err) throw err;
            return
          }
          db.currentTable.updateOne({name:ct.name},{currenttable:ct.tableid, auto:ct.auto},function(err,result){
            if (err){
              if (err) throw err;
              return
            }
          })
        })
      }
      else {
        db.currentTable.updateOne({name:ct.name},{currenttable:ct.tableid,auto:ct.auto},function(err,result){
          if (err){
            if (err) throw err;
            return
          }
        })
      }
    })
    res.send()
  })
})

//下面为基础表操作
router.get('/api/getbf',function(req,res){
  db.breakfastTable.find({},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
  })
})

router.get('/api/getlunch',function(req,res){
  db.lunchTable.find({},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
  })
})

router.get('/api/getdinner',function(req,res){
  db.dinnerTable.find({},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
  })
})

//下面为基础表操作
router.get('/table/api/getbf',function(req,res){
    db.breakfastTable.find({},function(err,docs){
        if (err){
            console.error(err)
            return 
        }
        res.json(docs)
    })
})

router.get('/table/api/getlunch',function(req,res){
    db.lunchTable.find({},function(err,docs){
        if (err){
            console.error(err)
            return 
        }
        res.json(docs)
    })
})

router.get('/table/api/getdinner',function(req,res){
    db.dinnerTable.find({},function(err,docs){
        if (err){
            console.error(err)
            return 
        }
        res.json(docs)
    })
})

router.get('/api/getothertable',function(req,res){
  db.otherTable.find({},function(err,docs){
      if (err){
          console.error(err)
          return 
      }
      res.json(docs)
  })
})


router.post('/api/savebf', function (req, res) {
  var ct = req.body.tableInformation
  db.breakfastTable.createCollection(function(err,result){
    db.breakfastTable.findOne({date: ct.date},function(err,docs){
      if (err){
        if (err) throw err;
        return
      }
      else if (docs == null){
        new db.breakfastTable(ct).save(function (err) {
          if (err){
            if (err) throw err;
            return
          }
        })
      }
      else {
        db.breakfastTable.updateOne({date:ct.date},{table:ct.table},function(err,result){
          if (err){
            if (err) throw err;
            return
          }
        })
      }
    })
    res.send()
  })
})

router.post('/api/savelunch', function (req, res) {

  var ct = req.body.tableInformation
  db.lunchTable.createCollection(function(err,result){
    db.lunchTable.findOne({date: ct.date},function(err,docs){
      if (err){
        if (err) throw err;
        return
      }
      else if (docs == null){
        new db.lunchTable(ct).save(function (err) {
          if (err){
            if (err) throw err;
            return
          }
        })
      }
      else {
        db.lunchTable.updateOne({date:ct.date},{table:ct.table},function(err,result){
          if (err){
            if (err) throw err;
            return
          }
        })
      }
    })
    res.send()
  })
})

router.post('/api/savedinner', function (req, res) {

  var ct = req.body.tableInformation
  db.dinnerTable.createCollection(function(err,result){
    db.dinnerTable.findOne({date: ct.date},function(err,docs){
      if (err){
        if (err) throw err;
        return
      }
      else if (docs == null){
        new db.dinnerTable(ct).save(function (err) {
          if (err){
            if (err) throw err;
            return
          }
        })
      }
      else {
        db.dinnerTable.updateOne({date:ct.date},{table:ct.table},function(err,result){
          if (err){
            if (err) throw err;
            return
          }
        })
      }
    })
    res.send()
  })
})

router.post('/api/saveothertable', function (req, res) {
  var ct = req.body.tableInformation
  db.otherTable.createCollection(function(err,result){
    db.otherTable.findOne({date: ct.date},function(err,docs){
      if (err){
        if (err) throw err;
        return
      }
      else if (docs == null){
        new db.otherTable(ct).save(function (err) {
          if (err){
            if (err) throw err;
            return
          }
        })
      }
      else {
        db.otherTable.updateOne({date:ct.date},{table:ct.table},function(err,result){
          if (err){
            if (err) throw err;
            return
          }
        })
      }
    })
    res.send()
  })
})

module.exports = router