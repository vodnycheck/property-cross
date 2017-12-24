import React from 'react';
import { Link } from 'react-router-dom'

function Favs(props){
	return (
		<div>
			<div>Favorit:</div>
			<ul>
				{
					props.list.map((item, index)=>
						<li key={index}>
							<Link to="/property" onClick={() => this.props.handleSetNewPropertyListing(item)}>
								<img src={item.img_url} alt="property picture"/>
								<div>{item.title}</div>
								<div>{item.price_currency + item.price}</div>
							</Link>
						</li>
					)
				}
			</ul>
		</div>
	);
}

export default Favs;