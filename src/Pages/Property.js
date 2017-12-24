import React from 'react';

function Property(props){
	return (
		<div>
			Property Page
			{props.listing.title}
			<button onClick={props.setLocalStorageItem(props.listing, 'favsList')}>Add to favs</button>
		</div>
	);
}

export default Property;