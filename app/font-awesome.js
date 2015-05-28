import React from 'react';

export default class FontAwesome extends React.Component {
	render() {
		return (
			<div>
				<i className={`fa fa-${this.props.icon} fa-${this.props.animate} fa-${this.props.size}x fa-fw`}></i>
			</div>
		);
	}
}
