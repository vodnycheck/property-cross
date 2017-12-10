import React from 'react';

function ListItem(props) {
    return <li>{props.value}</li>;
}

function SearchResult(props){
    const listItems = props.list.map((item) =>
        <ListItem key={item.toString()}
                  value={item.long_title}/>
    );
    return (
        <div>
            {props.isLocationMode ? (
                 <div>Please select a location below:</div>
                ) : (
                <div>Recent searches:</div>
                )
            }
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

export default SearchResult;