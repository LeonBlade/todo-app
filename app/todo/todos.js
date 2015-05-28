import React from 'react';
import Firebase from 'firebase';

import Todo from './todo';
import FontAwesome from '../font-awesome';

// our entire todos list
export default class Todos extends React.Component {
	// when our todo list is being created
	constructor(props) {
		// pass the props to super method
		super(props)

		// create blank object
		this.firebaseRef;
		// initialize a todo array
		this.todos = [];
		// set the state set to this array
		this.state = { todos: this.todos };
	}

	// when our component is about to render
	componentWillMount() {
		// create connection to firebase
		this.firebaseRef = new Firebase(`https://${this.props.appName}.firebaseio.com/todos`);

		// when a child is added to the todos
		this.firebaseRef.on('child_added', (child) => {
			// add value to the todos array
			this.todos.push({ key: child.key(), value: child.val() });
			// update the state to contain the new todos array
			this.setState({ todos: this.todos });
		});

		// when a child is deleted
		this.firebaseRef.on('child_removed', (child) => {
			// filter over todos array to remove key removed from firebase
			this.todos = this.todos.filter((todo) => {
				return todo.key != child.key();
			});

			// set the state to the new todos array
			this.setState({ todos: this.todos });
		})
	}

	// when the component is about to be removed
	compoenntWillUnmount() {
		// turn firebase ref off
		this.firebaseRef.off();
	}

	// render the todo list
	render() {
		// map over the todos array and create todo elements from it
		let todos = this.state.todos.map((todo) => {
			return (
				<li key={todo.key}>
					<Todo appName={this.props.appName} id={todo.key} state={todo.value.state} created={todo.value.created}>
						{todo.value.text}
					</Todo>
				</li>
			);
		});

		// return JSX for our todos
		return <ul>{todos}</ul>;
	}
}
