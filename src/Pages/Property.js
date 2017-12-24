import React from 'react';

function Property(props){
	return (
		<div>
			Property Page
			{props.listing.title}
		</div>
	);
}

export default Property;