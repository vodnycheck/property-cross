import React from 'react';
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton.js'

import Star from 'react-icons/lib/io/star';
import UnStar from 'react-icons/lib/fa/star-o';

function Favs(props){
	return (
		<div className="container">
			<h1 className="d-flex align-items-center text-uppercase mb-5">
				<BackButton className="float-left mt-2" />
				<span className="col">Favorites</span>
			</h1>
			<ul className="list-group my-2">
				{
					props.list.map((item, index)=>
						<li key={index} className="list-group-item">
							{props.isInLocalStorage('favsList', item) ? (
									<button onClick={() => props.removeLocalStorageItem(item, 'favsList')} className="btn btn-danger float-right"><UnStar /> Remove from favs</button>
							) : (
									<button onClick={() => props.setLocalStorageItem(item, 'favsList')} className="btn btn-primary float-right"><Star /> Add to favs</button>
							)}
							<Link to="/property" onClick={() => props.handleSetNewPropertyListing(item)} className="row align-items-start">
								<img src={item.thumb_url} alt="property picture" className="img-fluid m-1"/>
								<div className="col">
									<h2 className="h4">{item.title}</h2>
									<div>{item.price_currency + item.price}</div>
								</div>
							</Link>
						</li>
					)
				}
			</ul>
		</div>
	);
}

export default Favs;