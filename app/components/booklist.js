const React = require('react')
const ReactDOM = require('react-dom')
const Constant = require("../util/constants");
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const session = require('electron').remote.session;

class BookList extends React.Component {
	constructor(props) {
        super(props);
        this.state = { 
            data: booksList,
            chapterData:[]
    	};   
	session.defaultSession.cookies.get({ url: 'http://refs.autographa.com ' }, (error, cookie) => {
        if (cookie.length > 0) {
            chapter = cookie;
            console.log(chapter[3].value);
        } 
    });
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
		var cookieRef = { url: 'http://refs.autographa.com', name: 'book', value: global.book };
	    session.defaultSession.cookies.set(cookieRef, (error) => {
	        if (error)
	            console.log(error);
	    });
	    session.defaultSession.cookies.get({ url: 'http://refs.autographa.com ' }, (error, cookie) => {
                if (cookie.length > 0) {
                    chapter = cookie;
                    console.log(chapter);
                    // initializeTextInUI(book, chapter);
                } 	
            });
	     const cookie = { url: 'http://chapter.autographa.com', name: 'chapter', value: 2 };
            session.defaultSession.cookies.set(cookie, (error) => {
                if (error)
                    console.error(error);
            });
		getData.then((item) =>{
			this.setState({chapterData:item})
		})
	}

	render() {
	    return ( 
	    <Tabs animation={false} activeKey={this.state.key} onClick={() =>this.goToTab(1)} id="noanim-tab-example">
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
                	<ChapterList chapterData = { this.state.chapterData } />
            	</div>
            </Tab>
  		</Tabs>
      )
	}
}

var BookGroup = function(props) {
	const ACTIVE = { background: '#286090', color: '#fff'}
	const BooksGroup = props.result.map((item,index) =>{
		let _handleClick = this.onItemClick.bind(this, index+1);
		return <li key={index}><a href="#" activeStyle={ACTIVE} key={index} onClick={_handleClick } value={item}>{item}
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
