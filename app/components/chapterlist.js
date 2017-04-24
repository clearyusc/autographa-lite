import React from 'react';
import ReactDOM from 'react-dom';

class BookList extends React.Component {
	render() {
	    return (
	      <li><a href="#">{this.props.result}</a></li>
	    );
	}	
}

export default BookList