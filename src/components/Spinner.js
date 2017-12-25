import React from 'react';

function Spinner(props){
	if (props.show) {
		return (
			<div>spinner</div>
		)
	} else {
		return (
			<span></span>
		)
	}
}

export default Spinner;