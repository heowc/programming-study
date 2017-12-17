import React from 'react';

class Codelab extends React.Component {
	render() {
		let sText = 'Hi! I am won chul';
		let oStyle = {
			backgroundColor: 'black',
			color: 'white'
		};

		return (
			<div style={oStyle}>{sText}</div>
		);
	}
}

export default Codelab;