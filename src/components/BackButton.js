import React from 'react';
import createHistory from 'history/createBrowserHistory';

class BackButton extends React.Component {
	constructor(props) {
		super(props);

		this.handleBack = this.handleBack.bind(this);
	}

	handleBack() {
		const history = createHistory()
		history.goBack();
	}

	render() {
		return (
				<button onClick={this.handleBack} style={ButtonStyle}>
					{'<'} Back
				</button>
		)
	}
}

const ButtonStyle = {
	color: '#f00',
};

export default BackButton;