import React from 'react';
import BackButton from '../components/BackButton.js'

function Property(props){
	return (
		<div>
			<BackButton />
			Property Details
			{props.isInLocalStorage('favsList', props.listing) ? (
					<button onClick={() => props.removeLocalStorageItem(props.listing, 'favsList')}>Remove from favs</button>
			) : (
					<button onClick={() => props.setLocalStorageItem(props.listing, 'favsList')}>Add to favs</button>
			)}
			<div>{props.listing.price_currency}{props.listing.price}</div>
			<div>{props.listing.title}</div>
			<img src={props.listing.img_url} alt="property picture"/>
			<div>
				{props.listing.bedroom_number > 0 ? (<span>{props.listing.bedroom_number} Bedrooms</span>) : ('')},
				{props.listing.bathroom_number > 0 ? (<span>{props.listing.bathroom_number} Bathrooms</span>) : ('')}
			</div>
			<div>{props.listing.summary}</div>
		</div>
	);
}

export default Property;