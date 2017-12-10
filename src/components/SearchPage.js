import React from 'react';
import SearchForm from './SearchForm.js';
import SearchResultContainer from './SearchResultContainer.js';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorState: 0,
            inputText: '',
            locationMode: false,
            pendingState: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleGoClick = this.handleGoClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            inputText: e.target.value
        });
    }

    handleGoClick() {
        console.log(111111111)
        this.child.ajaxSend() // do stuff
    }

    handleLocationClick() {
        console.log(222222222)
    }

    render() {
        return (
            <div>
                <h1>Property Cross</h1>
                <a href="/favor">favor</a>
                <div>spinner{this.state.inputText}</div>
                <p>Use the form below to search for houses to buy. You can search by place-name, postcode, or click 'My location', to search in your current location!</p>
                <SearchForm
                    handleLocationClick={this.handleLocationClick}
                    handleInputChange={this.handleInputChange}
                    handleGoClick={this.handleGoClick}
                    inputText={this.state.inputText}
                />
                <SearchResultContainer
                    inputText={this.state.inputText}
                    onRef={ref => (this.child = ref)}
                />
            </div>
        );
    }
}

export default SearchPage;