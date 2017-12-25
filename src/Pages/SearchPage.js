import React from 'react';
import { Link } from 'react-router-dom'
import SearchForm from '../components/SearchForm.js';
import RecentSearch from '../components/RecentSearch.js';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Property Cross</h1>
                <Link to="/favs">favor</Link>
                <p>Use the form below to search for houses to buy. You can search by place-name, postcode, or click 'My location', to search in your current location!</p>
                {this.props.errorState > 0 ? (
                    <p>{this.props.errorMessage}</p>
                ) : (
                    <span></span>
                )}
                <SearchForm
                    handleLocationClick={this.props.handleLocationClick}
                    handleInputChange={this.props.handleInputChange}
                    handleGoClick={this.props.handleGoClick}
                    inputText={this.props.inputText}
                />
                <RecentSearch
                    recentSearchList={this.props.recentSearchList}
                    handleRecentClick={this.props.handleRecentClick}
                />
            </div>
        );
    }
}

export default SearchPage;