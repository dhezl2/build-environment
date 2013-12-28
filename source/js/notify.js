/**
Provides the base Notification class...

@module Notify

@requires events
@requires util

@extends EventEmitter
**/

var eventEmitter = require('events').EventEmitter;
var util = require('util');



/**
Throws a javascript alert containing the supplied text.

@class Notify
@constructor
@param {String} str Text of the alert to be thrown.
**/
function Notify(str) {
	console.log(str);
	//alert(str);

	$('#lastLine').html('what what');	
}
module.exports = Notify;
util.inherits(Notify, eventEmitter);


Notify.prototype.add = function(n1, n2) {
	return(n1 + n2);
};

Notify.prototype.sendEvent = function() {
	this.emit('testEvent');
};