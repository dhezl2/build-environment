var Notify = require('./notify');

var notify = new Notify('hello world');

module.exports = App;

function App() {
	notify.sendEvent();
}

App.prototype.testFunc = function() {
	console.log('testFunc invoked');
	return true;
};

notify.on('testEvent', function() {
	console.log('event caught');
});

window.app = new App();