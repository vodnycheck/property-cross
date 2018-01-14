import 'bootstrap';
import './assets/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './Pages/SearchPage.js';
import SearchResultsPage from './Pages/SearchResultsPage.js';
import Spinner from './components/Spinner.js';
import Property from './Pages/PropertyPage.js';
import Favs from './Pages/FavsPage.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import {withRouter} from "react-router-dom";
import isEqual from "lodash";

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';


class RootComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSpinner: false,
			list: [],
			errorState: 0,//1 — no properties
			errorMessage: '',
			inputText: '',
			isRedirectNeeded: false,
			placeToRedirect: '',
			pendingState: false,
			maxPageNumber: 0,
			currentPageNumber: 1,
			listing:{},
			recentSearchList: [],
			favsList: [],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleGoClick = this.handleGoClick.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleRouteChange = this.handleRouteChange.bind(this);
		this.handleSetNewPropertyListing = this.handleSetNewPropertyListing.bind(this);
		this.handleRecentClick = this.handleRecentClick.bind(this);
		this.setLocalStorageItem = this.setLocalStorageItem.bind(this);
		this.removeLocalStorageItem = this.removeLocalStorageItem.bind(this);
		this.isInLocalStorage = this.isInLocalStorage.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			inputText: e.target.value
		});
	}

	componentWillMount(){
		this.getFromLocalStorage('recentSearchList');
		this.getFromLocalStorage('favsList');
	}

	requestToServer(settings) {
		this.setState({
			showSpinner: true
		});

		const originBody = '?country=uk&pretty=1&action=search_listings&encoding=json&number_of_results=50&sort=relevancy';
		let parameters = '';
		const isLocation = typeof settings !== 'undefined' && settings.location === true ? true : false;
		if (isLocation) {
			parameters = '&centre_point=' + settings.latitude + ',' + settings.longitude;
		} else {
			parameters = '&place_name=' + this.state.inputText;
		}

		fetch(proxyUrl + 'https://api.nestoria.co.uk/api' + originBody +
				'&page=' + this.state.currentPageNumber + parameters, {
			method: 'GET',
			cache: 'force-cache',
			mode: 'cors'
		}).then(response => {
			return response.json();
		}).then(x => {
			this.setState({
				showSpinner: false
			});
			let response = x.response;
			let code = response.application_response_code;
			if (code == 100 || code == 101 || code == 110) {
				this.setState({
					list: response.listings,
					isRedirectNeeded: true,
					placeToRedirect: '/results',
					maxPageNumber: response.total_pages,
				});

				(!isLocation) && (this.setLocalStorageItem(this.state.inputText, 'recentSearchList'));
			}
			if (code == 200 || code == 201 || code == 202) {
				this.setState({
					isRedirectNeeded: false,
					errorState: 1,
					errorMessage: response.application_response_text
				});
			}
		}).catch(  );
	}

	handleGoClick(e) {
		typeof e !== "undefined" ? e.persist() : '';
		this.setState({
			currentPageNumber: 1
		});
		this.requestToServer();
	}

	getFromLocalStorage(key){
		if (localStorage.getItem(key) !== null) {
			let newState = {};
			newState[key] = JSON.parse(localStorage.getItem(key));
			this.setState(newState);
		} else {
			localStorage.setItem(key, '[]');
		}
	}

	setLocalStorageItem(newItem, key) {
		let list = this.state[key];
		let isRepeat = this.isInArray(list, newItem);

		if (!isRepeat) {
			list.push(newItem);
			let newState = {};
			newState[key] = list;
			this.setState(newState);
			localStorage.setItem(key, JSON.stringify(list));
		}
	}

	isInArray(array, item) {
		let isInArray = false;
		array.forEach((x)=>{
			if (_.isEqual(x, item)) {
				isInArray = true;
			}
		});
		return isInArray;
	}

	indexInArray(array, item) {
		let index = -1;
		array.forEach((x, i)=>{
			if (_.isEqual(x, item)) {
				index = i;
			}
		});
		return index;
	}

	isInLocalStorage(key, item) {
		let list = this.state[key];
		return this.isInArray(list, item)
	}

	removeLocalStorageItem(item, key) {
		let list = this.state[key];
		let index = this.indexInArray(list, item);

		if (index !== -1) {
			list.splice(index, 1);

			let newState = {};
			newState[key] = list;
			this.setState(newState);

			localStorage.setItem(key, JSON.stringify(list));
		}
	}

	handleLocationClick(e) {
		typeof e !== "undefined" ? e.persist() : '';

		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				let settings = {};
				settings.location = true;
				settings.latitude = position.coords.latitude;
				settings.longitude = position.coords.longitude;
				this.setState({
					errorState: 0,
					errorMessage: ''
				});
				this.requestToServer(settings);
			}, () => {
				this.setState({
					errorState: 1,
					errorMessage: 'Location is unavailable'
				});
			});
		} else {
			this.setState({
				errorState: 1,
				errorMessage: 'Location is unavailable'
			});
		}

		console.log('location dump')
	}

	handleSetNewPropertyListing(newListing) {
		this.setState({
			listing: newListing
		});
	}

	handleRouteChange() {
		this.setState({
			isRedirectNeeded: false
		});
	}

	handleRecentClick(e, request) {
		this.setState({
			inputText: request
		},() =>{this.requestToServer()});
	}

	handlePageChange(number) {
		if (number !== this.state.currentPageNumber) {
			this.setState({
				currentPageNumber: number
			},()=>{this.requestToServer()});
		}
	}

	render() {
		return (
		<div>
			<Spinner show={this.state.showSpinner}/>
			<HashRouter>
				<Switch>
					<Route exact path="/" render={(props) => (
					this.state.isRedirectNeeded ? (
						<Redirect push={true} to={{
							pathname: this.state.placeToRedirect,
						}} />
					) : (
						<SearchPage
							errorState={this.state.errorState}
							errorMessage={this.state.errorMessage}
							inputText={this.state.inputText}
							pendingState={this.state.pendingState}
							recentSearchList={this.state.recentSearchList}
							handleInputChange={this.handleInputChange}
							handleGoClick={this.handleGoClick}
							handleLocationClick={this.handleLocationClick}
							handleRecentClick={this.handleRecentClick}
						/>
					)

					)
					} />
					<Route path="/results" render={(props) => (
						this.state.list.length > 0 ? (
							<SearchResultsPage
								results={this.state.list}
								maxPageNumber={this.state.maxPageNumber}
								currentPageNumber={this.state.currentPageNumber}
								handlePageChange={this.handlePageChange}
								handleRouteChange={this.handleRouteChange}
								handleSetNewPropertyListing={this.handleSetNewPropertyListing}
								setLocalStorageItem={this.setLocalStorageItem}
								isInLocalStorage={this.isInLocalStorage}
								removeLocalStorageItem={this.removeLocalStorageItem}
							/>
						) : (
							<Redirect push={true} to='/' />
						)
					)}/>
					<Route path="/property" render={props => (
						Object.keys(this.state.listing).length > 0 ? (
							<Property
								listing={this.state.listing}
								setLocalStorageItem={this.setLocalStorageItem}
								isInLocalStorage={this.isInLocalStorage}
								removeLocalStorageItem={this.removeLocalStorageItem}
							/>
						):(
							<Redirect push={true} to='/' />
						)
					)} />
					<Route path="/favs" render={(props) => (
						<Favs
							list={this.state.favsList}
							handleSetNewPropertyListing={this.handleSetNewPropertyListing}
							removeLocalStorageItem={this.removeLocalStorageItem}
							setLocalStorageItem={this.setLocalStorageItem}
							isInLocalStorage={this.isInLocalStorage}
						/>
					)}/>
				</Switch>
			</HashRouter>
		</div>
		)
	}
}

ReactDOM.render(
		<RootComponent />,
		document.getElementById('root')
);