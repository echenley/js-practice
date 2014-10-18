var Promise = function(fn) {
    var state = 'pending';
    var value;
    var deferred;
    
    function resolve(newValue) {
        console.log('resolved');
        value = newValue;
        state = 'resolved';
        if (deferred) {
            console.log('deferred');
            handle(deferred);
        }
    }
    
    function handle(onResolved) {
        if (state === 'pending') {
            console.log('pending');
            deferred = onResolved;
            return;
        }
        console.log('handled');
        onResolved(value);
    }
    
    this.then = function(onResolved) {
        console.log('then executed');
        handle(onResolved);
    };
    
    fn(resolve);
};

function doSomething() {
    console.log('doSomething');
    return new Promise(function(resolve) {
        var value = 42;
        // large timeout simulates asynchronous calls
        setTimeout(function() {
            resolve(value);
        }, 1000);
    });
}

doSomething().then(function(value) {
  console.log('Got a value:', value);
});
