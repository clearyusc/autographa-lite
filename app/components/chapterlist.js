const React = require('react')
const ReactDOM = require('react-dom')

class BookList extends React.Component {
	render() {
	    return (
	      <li><a href="#">{this.props.result}</a></li>
	    );
	}	
}

module.exports = BookList