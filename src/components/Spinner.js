import React from 'react';
import Icon from 'react-icons/lib/fa/circle-o-notch';

function Spinner(props){
	if (props.show) {
		return (
			<Icon className="icon-spin float-right spinner"/>
		)
	} else {
		return (
			<span></span>
		)
	}
}

export default Spinner;