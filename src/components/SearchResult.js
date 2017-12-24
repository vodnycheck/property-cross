import React from 'react';

function SearchResult(props){
    return (
        <div>
            <div>Recent searches:</div>
            <ul>
                {
                    props.recentSearchList.map((item,index)=>
                        <li key={index}>
                            <a href="#" onClick={(e) => props.handleRecentClick(e,item)}>{item}</a>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default SearchResult;