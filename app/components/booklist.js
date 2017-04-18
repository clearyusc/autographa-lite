const React = require('react')
const ReactDOM = require('react-dom')
const Constant = require("../util/constants");
 const Tabs = require('react-bootstrap/lib/Tabs');
 const Tab = require('react-bootstrap/lib/Tab');

class BookList extends React.Component {
	constructor(props) {
        super(props);
        this.state = { 
            data: booksList,
            chapterData:[]
    	};   
    } 

   handleSelect(key) {
    this.setState({key});
  }

	goToTab(key) {
		this.setState({key});
		var chap = [];
		var bookChapter = bookCodeList[parseInt(global.book, 10) - 1]
		var id = 'eng_udb' + '_' + bookCodeList[parseInt(book, 10) - 1]
		var getData = refDb.get(id).then(function(doc) {
			 doc.chapters.forEach(function(ref_doc) {
		    chap.push({ number: chapter });
			})  	
			return chap
		})

		getData.then((item) =>{
			this.setState({chapterData:item})
		})
	}

  


	render() {
	    return ( 
	    <Tabs defaultActiveKey={1} animation={false} activeKey={this.state.key} onSelect={this.handleSelect} id="noanim-tab-example">
		    <Tab eventKey={1} title="Tab 1" onClick={() => this.goToTab(2)}>
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
                	<ul id="chaptersList"> 
	                { this.state.chapterData.map(function(row, i) {
		          		return ( <li key={i}>{i+1}</li> );
		        	})} 	
                	</ul>
            	</div>
            </Tab>
  		</Tabs>
      )
	}
}

var BookGroup = function(props) {
	const BooksGroup = props.result.map((item,index) =>{
		let _handleClick = this.onItemClick.bind(this, index+1);
		return <li key={index}><a href="#" key={index} onClick={_handleClick } value={item}>{item}
		</a></li>
	})
	return (
		<div>{BooksGroup}</div>
	)
}

onItemClick = function(item, e) {  
  global.book = item;
}
	
module.exports = BookList
