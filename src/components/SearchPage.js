import React from 'react';
import SearchForm from './SearchForm.js';
import SearchResult from './SearchResult.js';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Property Cross</h1>
                <a href="/favor">favor</a>
                <div>spinner</div>
                <p>Use the form below to search for houses to buy. You can search by place-name, postcode, or click 'My location', to search in your current location!</p>
                <SearchForm
                    handleLocationClick={this.props.handleLocationClick}
                    handleInputChange={this.props.handleInputChange}
                    handleGoClick={this.props.handleGoClick}
                    inputText={this.props.inputText}
                />
                <SearchResult
                    inputText={this.props.inputText}
                    isAmbiguous={this.props.isAmbiguous}
                    list={this.props.list}
                    isLocationMode={this.props.isLocationMode}
                />
            </div>
        );
    }
}

export default SearchPage;