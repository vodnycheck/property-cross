import React from 'react';
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton.js'

function Favs(props){
	return (
		<div>
			<BackButton />
			<div>Favorit:</div>
			<ul>
				{
					props.list.map((item, index)=>
						<li key={index}>
							<Link to="/property" onClick={() => props.handleSetNewPropertyListing(item)}>
								<img src={item.img_url} alt="property picture"/>
								<div>{item.title}</div>
								<div>{item.price_currency + item.price}</div>
							</Link>
							{props.isInLocalStorage('favsList', item) ? (
									<button onClick={() => props.removeLocalStorageItem(item, 'favsList')}>Remove from favs</button>
							) : (
									<button onClick={() => props.setLocalStorageItem(item, 'favsList')}>Add to favs</button>
							)}
						</li>
					)
				}
			</ul>
		</div>
	);
}

export default Favs;