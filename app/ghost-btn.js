import React from 'react';

import SVGTextMask from './svg-text-mask';

export default class GhostButton extends React.Component {
	onClick() {
		this.props.onClick.call();
	}

	render() {
		let className = `ghost-btn ghost-btn-${this.props.color}`;
		return (
			<button type="button" className={className} onClick={this.onClick.bind(this)}>
				<SVGTextMask color="white">{this.props.children}</SVGTextMask>
			</button>
		);
	}
}
