import React from 'react';

export default class SVGTextMask extends React.Component {
	render() {
		return (
			<svg className="svg-text-mask">
				<defs>
					<mask id="mask">
						<rect id="alpha" x="0" y="0" width="100%" height="100%" />
						<text id="text" x="50%" y="50%">
							{this.props.children}
						</text>
					</mask>
				</defs>
				<rect id="base" x="0" y="0" width="100%" height="100%" />
				<text id="baseText" x="50%" y="50%">
					{this.props.children}
				</text>
			</svg>
		);
	}
}
