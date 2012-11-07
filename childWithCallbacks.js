var 
   cp = require('child_process'),
   util = require('util'),
   ee = require('events');
   

 
 function Parent(module){
 	ee.EventEmitter.call(this);
 	this.child = cp.fork(module);
	this.mid = 1;
	this.child.on('message',receive.bind(this));
 }
 util.inherits(Parent,ee.EventEmitter);
 
 function receive(message,handle){
 	this.emit(message.mid,message.err,message.data,handle);
 }
 
 Parent.prototype.send = function(message,handle,callback){
 	var s = [{
		data:message,
		mid: this.mid++
	}];
	
	if(handle) s.push(handle);
 	this.child.send.apply(this.child,s);
	this.once(s[0].mid,callback);
	if(this.mid==Number.MAX_VALUE) this.mid = 1;
 }
 
 function Child(){
 	ee.EventEmitter.call(this);
	process.on('message',childReceive.bind(this));
}
util.inherits(Child,ee.EventEmitter);

function childReceive(message,handle){
    this.emit('message',message.data,handle,function(err,data,handle){
		var s = [{
			mid: message.mid,
			err: err,
			data: data
		}];
		if(handle) s.push(handle);
		process.send.apply(process,s);
	});	
	
}

var P;
exports.child = Parent;
exports.getParent = function(){
	if (!P) {
		P = new Child();
		return P;
	}	 
	return P;
}


