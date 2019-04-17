var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://Nadine:nidelle@localhost:27017/data';

mongo.connect(url, (err)=>{
    console.log('listen database!')
})

app.get('/getdata', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('accData');
        collection.find({}).toArray((x, hasil)=>{
            res.send(hasil);
        })
    })
})

app.post('/getdata', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('accData');
        var sesuatu = {
			currenttest: req.body.currenttest,
			trialNumber: req.body.trialNumber,
            x: req.body.x,
            y: req.body.y,
			z: req.body.z,
			//slowSpeedArray: req.body.slowSpeedArray,
			//slowSpeedAVG: req.body.slowSpeedAVG,
			//fastSpeedArray: req.body.fastSpeedArray,
			//fastSpeedAVG: req.body.fastSpeedAVG,
			//allSpeedArray: req.body.allSpeedArray,
        }
        collection.insert(sesuatu, (x, hasil)=>{
            res.send(hasil);
        })
    })
})

app.post('/getdata2', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('accData2');
        var sesuatu = {
			currenttest: req.body.currenttest,
			trialNumber: req.body.trialNumber,
            x: req.body.x,
            y: req.body.y,
			z: req.body.z
        }
        collection.insert(sesuatu, (x, hasil)=>{
            res.send(hasil);
        })
    })
})

app.post('/getdata3', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('accData3');
        var sesuatu = {
			currenttest: req.body.currenttest,
			trialNumber: req.body.trialNumber,
            x: req.body.x,
            y: req.body.y,
			z: req.body.z
        }
        collection.insert(sesuatu, (x, hasil)=>{
            res.send(hasil);
        })
    })
})


app.listen(3210, ()=>{
    console.log('Server actif @port 3210!');
})