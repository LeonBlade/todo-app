let symbol = Symbol();
let singletonEnforcer = Symbol();

export default class TodoUpdateScheduler {
	// called on creating an instance of this class
	constructor(enforcer) {
		// cannot create instance of todo update scheduler
		if (enforcer != singletonEnforcer) {
			throw "Cannot construct singleton!";
		}

		// set some variables for the intervals
		this.seconds = { timeout: 1000, callbacks: [] };
		this.minutes = { timeout: 1000 * 60, callbacks: [] };
		this.hours = { timeout: 1000 * 60 * 60, callbacks: [] };

		// start intervals
		this.start("seconds");
		this.start("minutes");
		this.start("hours");
	}

	// get static instance singleton of todo update scheduler
	static get instance() {
		// if singleton instance isn't here
		if (!this[symbol]) {
			// create new one using singleton enforcer symbol
			this[symbol] = new TodoUpdateScheduler(singletonEnforcer);
		}
		// return the singleton instnace
		return this[symbol];
	}

	// start interval on specific clock
	start(which) {
		// set interval for seconds
		setInterval(() => {
			// loop through the callbacks
			this[which].callbacks = this[which].callbacks.filter((callback) => {
				return callback.call(null, which);
			});
		}, this[which].timeout);
	}

	// add a callback to a specific interval
	add(which, callback) {
		// make sure we are pushing to a real interval
		if (which in this) {
			// push our callback onto the array
			this[which].callbacks.push(callback);
		}
	}
}
