const request = require('request');

'use strict';

const mesaj = require('../app');






/*
const serialPort =require('serialport')
const port =new serialPort(
    'COM5',
    {baudRate:115200}
)
const parser=new serialPort.parsers.Readline()
port.pipe(parser)
var d=parser.on('data',(line)=>{
    return line
})*/


var position = [
    39.9639,
    32.8383 
];
// Tek bir yönde hareket ediyor.
var deltaPosition = {x:Math.random()-.5,y:Math.random()-.5};
deltaPosition.x *=.001;
deltaPosition.y *=.001; 


function SendRandom(){
    position[0] += deltaPosition.x;
    position[1] += deltaPosition.y;
    
   
    request.post({
        url:'http://localhost:4000/api/v1/send/0000/telemetry', 
        form: { 
           temperature:mesaj.yaz() ,
            humidity:(Math.random()*10 + 70 ).toFixed(1), 
            position: position
            /*
                position: [
                    36.53437 ,
                    48.57057
                ]
            */
                
        }
        
    }, 
        function(err,httpResponse,body){ 
            console.log(err,body);
           
            
            
        }
        
        

    )
    


}

setInterval(SendRandom,2000);
