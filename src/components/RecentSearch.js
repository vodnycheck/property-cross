import React from 'react';

function RecentSearch(props){
    return (
        <div>
            <h2>Recent searches:</h2>
            <ul className="list-group">
                {
                    props.recentSearchList.map((item,index)=>
                        <li key={index} className="list-group-item">
                            <a href="#" onClick={(e) => props.handleRecentClick(e,item)}>{item}</a>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default RecentSearch;