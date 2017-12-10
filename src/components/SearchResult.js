import React from 'react';

function SearchResult(props){
    return (
        <div>
            <div>Recent searches:</div>
            <div>Please select a location below:</div>
            <ul>
                <li>{props.inputText}</li>
            </ul>
        </div>
    );
}

export default SearchResult;