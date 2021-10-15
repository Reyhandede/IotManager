

const TelegramBot = require('node-telegram-bot-api'); //Kütüphaneleri tanımlıyorum
const request = require("request");

const token = '1688944692:AAFX0mnG98YK_L8-zzroyvF2_2frFPeX9R4';

const bot = new TelegramBot(token, {polling: true}); //Botu oluşturuyorum



bot.onText(/\/kayit/, (msg, match) => {
    
    var options = { method: 'GET', //API'a gidecek isteğin özelliklerini belirtiyorum.
      url:"http://localhost:4000/api/v1/get/0000/telemetry",
      json:true
    };  
    
   
   function x()
   {
    request(options, function  (error, response, body) { //İsteği gerçekleştiriyorum
        if (error) throw new Error(error);
        
        console.log(body[0].temperature);
        var abbr=body[0].temperature; 
        const chatId = msg.chat.id; 
        if (abbr>32.4) { 
          bot.sendMessage(chatId,"Sıcaklık "+abbr+" !");
        } 
        


        
      });
   }
   setInterval(x,3000);
    
  
});
