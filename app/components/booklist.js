const React = require('react')
const ReactDOM = require('react-dom')
const Constant = require("../util/constants");
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const session = require('electron').remote.session;
const { dialog } = require('electron').remote;


class BookList extends React.Component {
	constructor(props) {
        super(props);
        this.state = { 
            data: booksList,
            chapterData:[],
            book: 1,
            currentBook: 1,
            activeTab:props.activeTab,
            chapterData:props.chapData
    	};
		session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, cookie) => {
	    	if (cookie.length > 0) {
	            var bookNo = cookie[0].value;
	            console.log(cookie);
	            this.setState({bookNo: bookNo});
	            } else {
					this.setState({book: '1'})
	        	} 	
	    });
	}
     
   handleSelect(key) {
    this.setState({key});
  }

	goToTab(key) {
		this.setState({activeTab:key});
		var chap = [];
		var bookChapter = bookCodeList[parseInt(global.book, 10) - 1]
		var bookno = global.book
		this.setState({currentBook: global.book})
		var id = 'eng_udb' + '_' + bookCodeList[parseInt(bookno, 10) - 1]
		var getData = refDb.get(id).then(function(doc) {
			 doc.chapters.forEach(function(ref_doc) {
		    chap.push({ number: chapter });
			})  	
			return chap
			console.log(chap)
		})
		
		getData.then((item) =>{
			this.setState({chapterData:item})
		})
	}

	render() {
	    return ( 
	    <Tabs animation={false} activeKey={this.state.activeTab} onSelect={() =>this.goToTab((this.state.key == 1) ? 2 : 1)} id="noanim-tab-example">
		    <Tab eventKey={1} title="Book" onClick={() => this.goToTab(2)}>
			    <div className="wrap-center"></div>
	            <div className="row books-li" id="bookdata">
	                <ul id="books-pane">
	                    <BookGroup result={this.state.data} currentBook = {this.state.currentBook} />
	                </ul>
	            </div>
	            <div className= "clearfix"></div>
            </Tab>
		    <Tab eventKey={2} title="Chapters" > 
		    	<div className="chapter-no">
                		<ChapterList chapterData = { this.state.chapterData } />
            	</div>
            </Tab>
  		</Tabs>
      )
	}
}

var BookGroup = function(props) {
	const BooksGroup = props.result.map((item,index) =>{
		let _handleClick = this.onItemClick.bind(this, index+1);
		console.log(props.currentBook)
		return <li key={index}><a href="#" key={index} onClick={_handleClick } value={item} className={(index+1 == props.currentBook) ? 'link-active': ""}>{item}
		</a></li>
	})
	return (
		<div>{BooksGroup}</div>
	)
}

var ChapterList = function(props) {
	const ChaptersList = props.chapterData.map(function(row, i) {
		return ( <li key={i}>{i+1}</li> );
	})
	return ( <ul id="chaptersList"> { ChaptersList } </ul>)   
}

onItemClick = function(item, e) {  
  global.book = item;
}
	
module.exports = BookList