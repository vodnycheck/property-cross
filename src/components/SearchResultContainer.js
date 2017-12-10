import React from 'react';
import SearchResult from './SearchResult.js';

class SearchResultContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAmbiguous: false,
            list: []
        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    ajaxSend(){
        console.log(3333333333333)
    }

    render() {
        return <SearchResult
            inputText={this.props.inputText}
            isAmbiguous={this.state.isAmbiguous}
            list={this.state.list}
        />
    }
}

export default SearchResultContainer;