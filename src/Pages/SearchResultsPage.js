import React from 'react';
import BackButton from '../components/BackButton.js';
import PageNumber from '../components/PageNumber.js';

class SearchResultsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount(){
		this.props.handleRouteChange();
	}

	render(){
		return (
			<div>
				<BackButton />
				<PageNumber
					currentPageNumber={this.props.currentPageNumber}
					handlePageChange={this.props.handlePageChange}
					maxPageNumber={this.props.maxPageNumber}
				/>
				<ul>
					{
						/*props.list.map((item) =>
						 <li key={item.toString()}>
						 </li>)*/
					}
				</ul>
			</div>
		)
	}
}

export default SearchResultsPage;