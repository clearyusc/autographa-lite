// <<<<<<< HEAD
// const React = require('react')
// const ReactDOM = require('react-dom')
// const Constant = require("../util/constants");
// const Tabs = require('react-bootstrap/lib/Tabs');
// const Tab = require('react-bootstrap/lib/Tab');
// const session = require('electron').remote.session;
// const { dialog } = require('electron').remote;
// =======
import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
const session =  require('electron').remote.session;
const Constant = require("../util/constants")
import { dialog } from 'electron';
import { remote } from 'electron';

class BookList extends React.Component {
	constructor(props) {
        super(props);
        this.onItemClick = this.onItemClick.bind(this);
        this.state = { 
            data: Constant.booksList,
            chapterData:[],
            book: 1,
            activeTab:props.activeTab,
            chapterData:props.chapData,
            currentChapter:1,
            onModalClose:props.onModalClose
    	};

		session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, cookie) => {
	    	if (cookie.length > 0) {
	            var bookNo = cookie[0].value;
	            this.setState({currentBook: bookNo});
	            console.log(bookNo);
            } else {
				this.setState({currentBook: 'bookNo1'})
        	} 	
	    });
	}

	onItemClick(bookNo) {
  		global.book = bookNo;
	}
     
	handleSelect(key) {
		this.setState({key});
	}

	goToTab(key) {
		this.setState({activeTab:key});
		var chap = [];
		var bookChapter = bookCodeList[parseInt(global.book, 10) - 1]
		let bookNo = global.book
		global.bookname = bookCodeList[parseInt(global.book, 10) - 1]
		if(!bookNo){
			bookNo = 1;
		}
		this.setState({currentBook: bookNo})
		var id = 'eng_udb' + '_' + bookCodeList[parseInt(bookNo, 10) - 1]
		var getData = refDb.get(id).then(function(doc) {
			 doc.chapters.forEach(function(ref_doc) {
		    	chap.push({ number: chapter });
			})
			return chap
		}).catch(function(err){
			
	})
		const cookieRef = { url: 'http://book.autographa.com', name: 'book' , value: 'bookNo'+bookNo };
        session.defaultSession.cookies.set(cookieRef, (error) => {
            if (error)
                console.log(error);
        });

		getData.then((item) =>{
			if(item  && item.length)
			this.setState({chapterData:item})
		})
	}

	getValue(event){
		global.bookChapter = event.target.value;
		var book = this.state.data[parseInt(global.book, 10) - 1];
		global.bookName = book;
		this.state.onModalClose();
	}

	render() {
	    return ( 
	    <Tabs animation={false} activeKey={this.state.activeTab} onSelect={() =>this.goToTab((this.state.activeTab == 1) ? 2 : 1)} id="noanim-tab-example">
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
            		<ul id="chaptersList" onClick={this.getValue.bind(this)}>
 						<ChapterList chapterData = { this.state.chapterData } currentchapter = {this.state.currentchapter} onModalClose = {this.state.onModalClose}/> 
            		</ul>
            	</div>
            </Tab>
  		</Tabs>
      )
	}
}
var BookGroup = function(props) {
	const BooksGroup = props.result.map((item,index) =>{
		return <li key={index}><a href="#" onClick={onItemClick.bind(this, index+1) } value={item} className={(index+1 == props.currentBook) ? 'link-active': ""}>{item}
		</a></li>
	})
	return (
		<div>{BooksGroup}</div>
	)
}

var ChapterList = function(props) {
		const ChaptersList = props.chapterData.map(function(row, i) {
		return ( <li key={i}><a href='#'  onClick={props.onModalClose} className={(i+1 == props.currentChapter) ? 'link-active': ""}>{i+1}</a></li> );
	})
	return ( <ul id="chaptersList"> { ChaptersList } </ul>)   
}

onItemClick => function(item, e) {  
	global.book = item;
}

module.exports = BookList