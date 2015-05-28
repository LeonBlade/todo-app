import React from 'react';
import Firebase from 'firebase';

import Todos from './todo/todos';
import GhostButton from './ghost-btn';
import FontAwesome from './font-awesome';

class Main extends React.Component {
	// when the main component is created
	constructor(props) {
		super(props);
		// store the state of our intput
		this.state = { input: "" };
	}

	// before the component renders
	componentWillMount() {
		// create a firebase reference
		this.firebaseRef = new Firebase(`https://${this.props.appName}.firebaseio.com/todos`);
	}

	// before the component is removed
	componentWillUnmount() {
		// turn off the firebase ref
		this.firebaseRef.off();
	}

	// when we press key down
	onKeyDown(event) {
		// if enter key was pressed
		if (event.keyCode == 13) {
			this.createTodo();
		}
	}

	// handling when the textbox changes
	handleChange(event) {
		// update the input based on the value
		this.setState({ input: event.target.value });
	}

	// clicking the button
	onClick() {
		// just create a todo
		this.createTodo();
	}

	// creating a new todo
	createTodo() {
		// return if our field is blank
		if (!this.state.input) {
			return;
		}
		
		// create object to send
		let obj = {
			created: new Date().toUTCString(),
			text: this.state.input,
			state: false
		};

		// push object onto todos
		this.firebaseRef.push(obj);

		// reset the text field state
		this.setState({ input: "" });
	}

	render() {
		return (
			<section className="app">
				<header>
					<h2>Todo List</h2>
					<p>Keep track of all the things that matter most to you in this convienient list.</p>
				</header>
				<hr />
				<section>
					<Todos appName={this.props.appName}>
						<i class="loading fa fa-circle-o-notch fa-spin"></i>
					</Todos>
				</section>
				<footer>
					<input className="stretch" type="text" onKeyDown={this.onKeyDown.bind(this)} onChange={this.handleChange.bind(this)} placeholder="enter your todo here..." value={this.state.input} />
					<GhostButton onClick={this.onClick.bind(this)}>Create</GhostButton>
				</footer>
			</section>
		);
	}
}

React.render(<Main appName="luminous-inferno-5923" />, document.getElementById('main'));
