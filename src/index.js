import React from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './Pages/SearchPage.js';
import SearchResultsPage from './Pages/SearchResultsPage.js';
import Property from './Pages/Property.js';
import Favs from './Pages/Favs.js';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import {withRouter} from "react-router-dom";
import isEqual from "lodash";


class RootComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			errorState: 0,//1 — no properties
			errorMessage: '',
			inputText: '',
			isRedirectNeeded: false,
			placeToRedirect: '',
			pendingState: false,
			maxPageNumber: 5,
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

		console.log(_.isEqual(1, 1));
	}

	handleGoClick(e) {
		e.preventDefault();
		const originBody = '?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=';
		fetch('https://api.nestoria.co.uk/api' + originBody + this.state.inputText, {
			method: 'GET',
			cache: 'force-cache',
			mode: 'cors'
		}).then(response => {
			return response.json();
		}).then(x => {
			let response = x.response;
			let code = response.application_response_code;
			if (code == 100 || code == 101 || code == 110) {
				this.setState({
					list: response.listings,
					isRedirectNeeded: true,
					placeToRedirect: '/results'
				});

				this.setLocalStorageItem(this.state.inputText, 'recentSearchList');
			}
			if (code == 200 || code == 201 || code == 202) {
				this.setState({
					isRedirectNeeded: false,
					errorState: 1,
					errorMessage: 'Bad request'
				});
			}
		}).catch(  );
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

	handleLocationClick() {
		console.log(222222222)
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
		},() =>{this.handleGoClick(e)});
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
							errorState={this.state.errorState}
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
					)}/>
					<Route path="/property" render={props => (
						<Property
							listing={this.state.listing}
							setLocalStorageItem={this.setLocalStorageItem}
							isInLocalStorage={this.isInLocalStorage}
							removeLocalStorageItem={this.removeLocalStorageItem}
						/>
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
		)
	}
}

ReactDOM.render(
		<RootComponent />,
		document.getElementById('root')
);