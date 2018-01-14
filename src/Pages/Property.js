import React from 'react';
import BackButton from '../components/BackButton.js';
import Star from 'react-icons/lib/io/star';
import UnStar from 'react-icons/lib/fa/star-o';

function Property(props){
	return (
		<div className="container">
			<h1 className="d-flex align-items-center text-uppercase mb-5">
				<BackButton className="float-left mt-2" />
				<span className="col">Property Details</span>
				<div className="ml-auto">
					{props.isInLocalStorage('favsList', props.listing) ? (
							<button onClick={() => props.removeLocalStorageItem(props.listing, 'favsList')} className="btn btn-danger float-right"><UnStar /> Remove from favs</button>
					) : (
							<button onClick={() => props.setLocalStorageItem(props.listing, 'favsList')} className="btn btn-primary float-right"><Star /> Add to favs</button>
					)}
				</div>
			</h1>
			<div className="d-flex">
				<img src={props.listing.img_url} alt="property picture" className="img-fluid m-1"/>
				<div className="col">
					<h2>
						{props.listing.title}
					</h2>
					<p>
						Price: {props.listing.price_currency}{props.listing.price}
						<br/>
						{props.listing.bedroom_number > 0 ? (<span>{props.listing.bedroom_number} Bedrooms</span>) : ('')},
						<br/>
						{props.listing.bathroom_number > 0 ? (<span>{props.listing.bathroom_number} Bathrooms</span>) : ('')}
					</p>
					<p>{props.listing.summary}</p>
				</div>

			</div>
		</div>
	);
}

export default Property;