import React from 'react';
import Icon from 'react-icons/lib/fa/circle-o-notch';

function Spinner(props){
	if (props.show) {
		return (
			<Icon className="icon-spin float-right spinner text-warning" size={30}/>
		)
	} else {
		return (
				<span></span>
		)
	}
}

export default Spinner;