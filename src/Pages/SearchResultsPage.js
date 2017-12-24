import React from 'react';
import { Link } from 'react-router-dom'
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
						this.props.results.map((item, index) =>
						 <li key={index}>
							 <Link to="/property" onClick={() => this.props.handleSetNewPropertyListing(item)}>
								 <img src={item.img_url} alt="property picture"/>
								 <div>{item.title}</div>
								 <div>{item.price_currency + item.price}</div>
							 </Link>
						 </li>)
					}
				</ul>
			</div>
		)
	}
}

export default SearchResultsPage;