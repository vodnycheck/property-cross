import React from 'react';

function MyLocation(props){
    return (
        <button onClick={props.handleLocationClick}>My location</button>
    );
}

export default MyLocation;