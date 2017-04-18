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

   handleSelect(key) {
    this.setState({key});
  }

  goToTab(key) {
    this.setState({key});
  }


	render() {
	    return ( 
	    <Tabs defaultActiveKey={1} animation={false} activeKey={this.state.key} onSelect={this.handleSelect} id="noanim-tab-example">
		    <Tab eventKey={1} title="Tab 1" label="Tags"   onClick={() => this.goToTab(2)}>
			    <div className="wrap-center"></div>
	            <div className="row books-li" id="bookdata">
	                <ul id="books-pane">
	                    <BookGroup result={this.state.data} />
	                </ul>
	            </div>
	            <div className= "clearfix"></div>
            </Tab>
		    <Tab eventKey={2} title="Tab 2" > 
		    	<div className="chapter-no">
                	<ul id="chaptersList"></ul>
            	</div>
            </Tab>
  		</Tabs>
      )
	}
}

var BookGroup = function(props) {
	const BooksGroup = props.result.map((item,index) =>{
		let _handleClick = this.onItemClick.bind(this, index+1);
		return <li key={index}><a href="#" key={index} onClick={_handleClick } ref={(input) => this._obj = item} value={item}>{item}
		</a></li>
	})
	return (
		<div>{BooksGroup}</div>
	)
}

onItemClick = function(item, e) {  
  console.log(item);
}
	

var ChapterGroup = function(props) {
	
	const milestoneGroups = 
		<li onClick={setChapter()}><a href="#">{chapter}</a></li>
	
	return (
		<div>{milestoneGroups}</div>
	)
}

module.exports = BookList

