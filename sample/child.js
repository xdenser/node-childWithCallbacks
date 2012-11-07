var 
   parent = require('../childWithCallbacks').getParent();
   
   
   parent.on('message',function(message,handle,cb){
      console.log('Received '+message);
      setTimeout(function(){
          cb(null,'Done');
          process.exit();
      },10000); 
   });
    
