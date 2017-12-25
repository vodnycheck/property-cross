import React from 'react';

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
            <button onClick={this.props.handleLocationClick}>My location</button>
        </form>;
    }
}

export default SearchForm;