import React from 'react';
import ReactDOM from 'react-dom';

class BookBox extends React.Component {
	
	render() {

	    return (
	      <li>{this.props.result}</li>
	    );
	}	
}

module.exports = BookBox;