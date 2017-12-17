import React from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './Pages/SearchPage.js';
import SearchResultsPage from './Pages/SearchResultsPage.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import {withRouter} from "react-router-dom";


class RootComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			errorState: 0,//1 — no properties
			inputText: '',
			isLocationMode: false,
			isRedirectNeeded: false,
			placeToRedirect: '',
			pendingState: false,
			maxPageNumber: 5,
			currentPageNumber: 1
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleGoClick = this.handleGoClick.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleRouteChange = this.handleRouteChange.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			inputText: e.target.value
		});
	}

	handleGoClick(e) {
		e.preventDefault();
		const originBody = '?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=';
		fetch('https://api.nestoria.co.uk/api' + originBody + this.state.inputText, {
			method: 'GET',
			cache: 'default',
			mode: 'cors'
		})
				.then(response => {
					let code = response.status;
					if (code == 100 || code == 101 || code == 110) {
						this.setState({
							isLocationMode: false,
							isRedirectNeeded: true,
							placeToRedirect: '/results'
						});
					}
					if (code == 200 || code == 202) {
						this.setState({
							isLocationMode: true,
							isRedirectNeeded: true,
							placeToRedirect: '/results'
						});
					}
					return response.json();
				})
				.then(data => {
					if (this.state.isLocationMode) {
						this.setState({
							list: data.response.locations
						});
						if (data.response.locations.length === 0) {
							this.setState({
								errorState: 1
							});
						} else {
							this.setState({
								errorState: 0
							});
						}
					} else {
						this.setState({
							list: data.response.listings,
							errorState: 0
						});
					}
				})
				.catch(  );
	}

	handleLocationClick() {
		console.log(222222222)
	}

	handleRouteChange() {
		this.setState({
			isRedirectNeeded: false
		});
	}

	handlePageChange(number) {
		if (number !== this.state.currentPageNumber) {
			console.log(number)

			this.setState({
				currentPageNumber: number
			});
		}
	}

	render() {
		return (
			<HashRouter>
				<Switch>
					<Route exact path="/" render={(props) => (
					this.state.isRedirectNeeded ? (
						<Redirect push={true} to={{
							pathname: this.state.placeToRedirect,
						}} />
					) : (
						<SearchPage
							list={this.state.list}
							errorState={this.state.errorState}
							inputText={this.state.inputText}
							isLocationMode={this.state.isLocationMode}
							pendingState={this.state.pendingState}
							handleInputChange={this.handleInputChange}
							handleGoClick={this.handleGoClick}
							handleLocationClick={this.handleLocationClick}
						/>
					)

					)
					} />
					<Route path="/results" render={(props) => (
						<SearchResultsPage
							results={this.list}
							maxPageNumber={this.state.maxPageNumber}
							currentPageNumber={this.state.currentPageNumber}
							handlePageChange={this.handlePageChange}
							handleRouteChange={this.handleRouteChange}
						/>
					)}/>
					<Route path="/listing" />
					<Route path="/favs" />
				</Switch>
			</HashRouter>
		)
	}
}

ReactDOM.render(
		<RootComponent />,
		document.getElementById('root')
);