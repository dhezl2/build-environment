App = require('../source/js/app');
Notify = require('../source/js/notify');

console.log('tests loaded');


suite('Dependencies', function() {
	suite('jQuery', function() {
		test('Should be present', function() {
			assert.ok(window.jQuery);
		});
	});
});

suite('App', function() {
	suite('testFunc()', function() {
		test('method exists', function() {
			assert.ok(app.testFunc);
		});
	});
});

suite('Notify', function() {

	test('Module exists', function() {
		assert.ok(Notify);
	});
	suite('add()', function() {
		test('method exists', function() {
			var notify = new Notify()
			assert.ok(notify.add);
		});

		test('method adds correctly', function() {
			var notify = new Notify();
			assert(notify.add(2, 2) === 4);
		});

		test('method returns a number', function() {
			var notify = new Notify();
			assert.isNumber(notify.add(2, 2), "it's a number");
		});
	});	// end suite: add()

	suite('sendEvent()', function(){

	}); // end suite: sendEvent()

}); // end suite: Notify

