import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Location from 'react-icons/lib/io/location';
import Search from 'react-icons/lib/io/search';


class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.textInput.focus();
    }

    render(){
        return <form>
            <div className="row">
                <div className="col">
                    <input ref={elem => { this.textInput = elem; }} type="text" value={this.props.inputText} onChange={this.props.handleInputChange} className="form-control m-1"/>
                </div>
                <div className="col">
                    <button type="submit" onClick={this.props.handleGoClick} className="btn btn-primary m-1"><Search/> Go</button>
                    <button onClick={this.props.handleLocationClick} className="btn btn-secondary m-1"><Location/> My location</button>
                </div>
            </div>
        </form>;
    }
}

export default SearchForm;