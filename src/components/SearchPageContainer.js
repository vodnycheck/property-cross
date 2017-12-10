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
                        isLocationMode: false
                    });
                    return response.json();
                }
                if (code == 200 || code == 202) {
                    this.setState({
                        isLocationMode: true
                    });
                    return response.json();
                }
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