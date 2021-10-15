/*
    post: /api/send/TOKEN/
        - Uzak Mac Adresi Doğrulama
        - verilerin gitmesi
        {
            temperature:"Sıcaklık",
            humidty:"Nem Oranı",
            location: 22.15, 15.12
        }
*/
const express = require('express');
const path = require("path");

const router = express.Router();

/// DATABASE
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync( path.join(__dirname,'/views/views2/sensors.json' ) )
const db = low(adapter)
db.defaults({ sensors: {}, user: {}, count: 0 }).write()
/// DATABASE END




router.all("/api/v1/send/:token/telemetry",(req,res)=>{
    // VERİLERİ KAYDET
    // - db.set('sensors.'+req.params.token, req.body).write()
    var token = req.params.token,data = req.body;
    data._date = new Date().toISOString();
    var obj = {};
    obj[ token ] = [];
   // db.get('sensors').push({id:"678"}).write
    db.get("sensors").defaults(obj).get( token ).push( req.body ).write()

    // Eğer Soket İle Bağlı ise soket ile güncel eklenen verileri gönder.
    res.send("OK");
});

/*
    /api/v1/get/TOKEN/temperature
        {
            last: number
        }      

*/
router.all("/api/v1/get/:token/telemetry",(req,res)=>{
    // VERİLERİ GÖRÜNTÜLE
    // last
    var last=req.body.last;

    var token=req.params.token, sensor=req.params.sensor;
    if( last==null ){
        var val=db.get('sensors.'+token)
            .takeRight(10)
            .value();
            //.map(sensor)
        res.json(val);
    }else{
        var val=db.get('sensors.'+token)
            .takeRight(parseInt(last))
            .value();
            //.map(sensor)
        res.json(val);
    }
})


router.all("/api/v1/get/:token/:sensor",(req,res)=>{
    // VERİLERİ GÖRÜNTÜLE
    var last=req.body.last,  
        token=req.params.token, 
        sensor=req.params.sensor;
    console.log(req.body,req.body.last)
    if( last==null ){
        var val=db.get('sensors.'+token)
            .takeRight(10)
            .map(sensor)
            .value()
        res.json(val);
    }else{
        var val=db.get('sensors.'+token)
            .takeRight(parseInt(last))
            .map(sensor)
            .value();
        res.json(val);
    }
})


exports.router=router;