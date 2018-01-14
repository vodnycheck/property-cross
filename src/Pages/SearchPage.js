import React from 'react';
import { Link } from 'react-router-dom'
import SearchForm from '../components/SearchForm.js';
import RecentSearch from '../components/RecentSearch.js';
import Star from 'react-icons/lib/io/star';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-uppercase mb-5">Search page<Link to="/favs" className="btn btn-primary float-right mt-2"><Star /> Favorites</Link></h1>
                <p>Use the form below to search for houses to buy. You can search by place-name, postcode, or click “My location”, to search in your current location!</p>
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