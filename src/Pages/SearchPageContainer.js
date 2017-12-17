import React from 'react';
import SearchPage from './SearchPage.js';

class SearchPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAmbiguous: false,
            list: [],
            errorState: 0,//1 — no properties
            inputText: '',
            isLocationMode: false,
            pendingState: false,

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleGoClick = this.handleGoClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
    }
    ajaxSend(){
        console.log(3333333333333)
    }

    handleInputChange(e) {
        this.setState({
            inputText: e.target.value
        });
    }

    handleLocationClick() {
        console.log(222222222)
    }

    render() {
        return <SearchPage
            isAmbiguous={this.state.isAmbiguous}
            list={this.state.list}
            errorState={this.state.errorState}
            inputText={this.state.inputText}
            isLocationMode={this.state.isLocationMode}
            pendingState={this.state.pendingState}
            handleInputChange={this.handleInputChange}
            handleGoClick={this.handleGoClick}
            handleLocationClick={this.handleLocationClick}
        />
    }
}

export default SearchPageContainer;