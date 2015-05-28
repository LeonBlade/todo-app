import React from 'react';
import Firebase from 'firebase';

import FontAwesome from '../font-awesome';
import TodoUpdateScheduler from './todo-update-scheduler';

// a single todo component
export default class Todo extends React.Component {
	// when our todo is created
	constructor(props) {
		// call super for this component passing in the props
		super(props);

		// set the default state to match the props
		this.state = {
			timestamp: null,
			created: props.created,
			text: props.children,
			state: props.state
		};
	}

	// when our component is about to render for the first time
	componentWillMount() {
		// create connection to firebase
		this.firebaseRef = new Firebase(`https://${this.props.appName}.firebaseio.com/todos/${this.props.id}`);

		// handle change to this todo and change state based on it
		this.firebaseRef.on('child_changed', (data) => {
			this.setState({ [data.key()]: data.val() });
		});

		// call update to kickoff the interval updating
		this.update(null);
	}

	// when the component is going to be destroyed
	componentWillUnmount() {
		// turn off the firebase reference
		this.firebaseRef.off();
	}

	// changing state when we change the value manually
	handleCheckboxChange(event) {
		// change the state and cause a re-render for the element
		this.setState({ state: event.target.checked });

		// send a call to the firebase ref and change the state of the todo
		this.firebaseRef.update({ state: !this.state.state });
	}

	// handle clicking the delete button
	handleCloseClick(event) {
		// send to firebase to delete this todo
		this.firebaseRef.remove();
	}

	// calcuate the time to return for the timestamp
	calculateTime() {
		// get the current timestamp
		let now = new Date();
		// get the timestamp from creation time
		let then = new Date(this.props.created);
		// get the time difference
		let diff = Math.abs(now - then);

		// get the days
		let days = Math.floor(diff / 1000 / 60 / 60 / 24);
		// get the hours
		let hours = Math.floor(diff / 1000 / 60 / 60);
		// get the minutes
		let minutes = Math.floor(diff / 1000 / 60);
		// get the seconds
		let seconds = Math.floor(diff / 1000);

		// if we have any days
		if (days > 0) {
			// if we have more than 30 days
			if (days > 30) {
				// if we have more than 30 * 12 days (12 months)
				if (days > 30 * 12) {
					return { string: `${days / (30 * 12)}y` };
				}
				return { string: `${days / 30}m` };
			}
			return { string: `${days}d` };
		}
		// if we have any hours
		if (hours > 0) {
			return { interval: "hours", string: `${hours}h` };
		}
		// if we have any minutes
		else if (minutes > 0) {
			return { interval: "minutes", string: `${minutes}m` };
		}
		else if (seconds > 0) {
			return { interval: "seconds", string: `${seconds}s` };
		}
		else if (diff > 0) {
			return { interval: "seconds", string: "now" };
		}
		
		// some bug
		return { string: "?" };
	}

	update(interval) {
		// get our timestamp from calculate time method
		let timestamp = this.calculateTime();

		// set the state of the current timestamp
		this.setState({ timestamp: timestamp.string });

		// if the intervals dont match then set new interval
		if (interval != timestamp.interval) {
			// add new interval callback to the scheduler
			TodoUpdateScheduler.instance.add(timestamp.interval, this.update.bind(this));
			// our interval cycle is being upgraded so return false
			return false;
		}

		// our timer can keep going in this interval cycle
		return true;
	}

	// render method for this todo component
	render() {
		// alias the state variables
		let state = this.state.state;
		let text = this.state.text;

		// pass back our JSX for rendering
		return (
			<article className="ghost-checkbox">
				<input type="checkbox" checked={state} onChange={this.handleCheckboxChange.bind(this)}  />
				<span className="todo-timestamp">{this.state.timestamp}</span>
				<span className="todo-text">{text}</span>
				<span className="delete-btn" onClick={this.handleCloseClick.bind(this)}>
					<FontAwesome icon="close" />
				</span>
			</article>
		);
	}
}
