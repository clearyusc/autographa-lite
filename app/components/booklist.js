const React = require('react')
const ReactDOM = require('react-dom')
const Constant = require("../util/constants");
 const Tabs = require('react-bootstrap/lib/Tabs');
 const Tab = require('react-bootstrap/lib/Tab');

class BookList extends React.Component {
	constructor(props) {
        super(props);
        this.state = { 
            data: booksList
    	};   
    } 



	render() {
	    return (
	    <Tabs defaultActiveKey={1}  animation={false} id="noanim-tab-example">
		    <Tab eventKey={1} title="Tab 1">
		    <div className="wrap-center"></div>
            <div className="row books-li" id="bookdata">
                <ul id="books-pane">
                    <BookGroup result={this.state.data} />
                </ul>
            </div>
            <div className= "clearfix"></div></Tab>
		    <Tab eventKey={2} title="Tab 2"> 
		    	<div className="chapter-no">
                	<ul id="chaptersList"></ul>
            	</div>
            </Tab>
  		</Tabs>
      )
	}
}

var BookGroup = function(props) {
	function handleSelect(item) {
		console.log('selected ' + item);
	}

	const BooksGroup = props.result.map((item,index) =>
		<li key={index} onSelect={handleSelect(item)}>{item}</li>
	)
	return (
		<div>{BooksGroup}</div>
	)
}
	

var ChapterGroup = function(props) {
	const milestoneGroups = props.result.map((item,index) =>
		<li><a href="#">{item}</a></li>
	)
	return (
		<div>{milestoneGroups}</div>
	)
}

module.exports = BookList
