import React from 'react';
import MyLocation from './MyLocation.js';

function SearchPage(props){
    const element = (
        <div>
            <input autoFocus type="text" value={props.inputText} onChange={props.handleInputChange}/>
            <button onClick={props.handleGoClick}>Go</button>
            <MyLocation handleLocationClick={props.handleLocationClick} />
        </div>
    );

    return element;
}

export default SearchPage;