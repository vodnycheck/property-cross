import React from 'react';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	render() {
		return (
			<div onClick={this.handleClick}>
				<h1>Hello, world! {this.state.isToggleOn + ''}</h1>
			</div>
		);
	}
}

export default Button;