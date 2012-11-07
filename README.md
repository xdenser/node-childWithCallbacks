Wrapper for NodeJS [child_process.fork()](http://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options).

Adds callback parameter to send function. So you may receive direct callback from  on your message.
Usage is obvious from sample.

In parent:
```javascript
var 
   ChildProcess = require('../childWithCallbacks').child,
   child = new ChildProcess(__dirname + '/child.js');
   
  
  child.send('Wait10sec',null,function(err,data){
     console.log('Received '+data); 
  });
```

In child.js:
```javascript
 var 
   parent = require('../childWithCallbacks').getParent();
   
   
   parent.on('message',function(message,handle,cb){
      console.log('Received '+message);
      setTimeout(function(){
          cb(null,'Done');
          process.exit();
      },10000); 
   });
```   