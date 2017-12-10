import React from 'react';
import MyLocation from './MyLocation.js';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.textInput.focus();
    }

    render(){
        return <form>
            <input ref={elem => { this.textInput = elem; }} type="text" value={this.props.inputText} onChange={this.props.handleInputChange}/>
            <button type="submit" onClick={this.props.handleGoClick}>Go</button>
            <MyLocation handleLocationClick={this.props.handleLocationClick} />
        </form>;
    }
}

export default SearchForm;