import React from 'react';
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton.js';
import PageNumber from '../components/PageNumber.js';

import Star from 'react-icons/lib/io/star';
import UnStar from 'react-icons/lib/fa/star-o';

class SearchResultsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentInputPage : this.props.currentPageNumber
		};

		this.handleInputPageChange = this.handleInputPageChange.bind(this);
	}

	handleInputPageChange(number) {
		this.setState ({
			currentInputPage: parseInt(number,10)
		})
	}

	componentDidMount(){
		this.props.handleRouteChange();
	}

	render(){
		return (
			<div className="container">
				<h1 className="d-flex align-items-center text-uppercase mb-5">
					<BackButton className="float-left mt-2" />
					<span className="col">Search results</span>
					<div className="ml-auto">
						<PageNumber
								currentPageNumber={this.props.currentPageNumber}
								currentInputPage={this.state.currentInputPage}
								handlePageChange={this.props.handlePageChange}
								handleInputPageChange={this.handleInputPageChange}
								maxPageNumber={this.props.maxPageNumber}
						/>
					</div>
				</h1>
				<ul className="list-group my-2">
					{
						this.props.results.map((item, index) =>
						<li key={index} className="list-group-item">
							{this.props.isInLocalStorage('favsList', item) ? (
									<button onClick={() => this.props.removeLocalStorageItem(item, 'favsList')} className="btn btn-danger float-right"><UnStar /> Remove from favs</button>
							) : (
									<button onClick={() => this.props.setLocalStorageItem(item, 'favsList')} className="btn btn-primary float-right"><Star /> Add to favs</button>
							)}
							<Link to="/property" onClick={() => this.props.handleSetNewPropertyListing(item)} className="row align-items-start">
								<img src={item.thumb_url} alt="property picture" className="img-fluid m-1"/>
								<div className="col">
									<h2 className="h4">{item.title}</h2>
									<div>Price: {item.price_currency + item.price}</div>
								</div>
							</Link>
						</li>)
					}
				</ul>
				<div className="row">
					<div className="mx-auto">
						<PageNumber
								currentPageNumber={this.props.currentPageNumber}
								currentInputPage={this.state.currentInputPage}
								handlePageChange={this.props.handlePageChange}
								handleInputPageChange={this.handleInputPageChange}
								maxPageNumber={this.props.maxPageNumber}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default SearchResultsPage;