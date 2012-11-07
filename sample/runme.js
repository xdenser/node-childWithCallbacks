var 
   ChildProcess = require('../childWithCallbacks').child,
   child = new ChildProcess(__dirname + '/child.js');
   
  
  child.send('Wait10sec',null,function(err,data){
     console.log('Received '+data); 
  });

