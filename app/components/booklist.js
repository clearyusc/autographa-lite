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
            currentChapter:1,
            onModalClose:props.onModalClose,
            bookNo:'',
            OTbooksstart:0,
            OTbooksend:38,
            NTbooksstart: 39,
            NTbooksend: 65
    	};
	}

	getOTList(OTbooksstart, OTbooksend) {
		var booksOT = [];
		for (var i = OTbooksstart; i <= OTbooksend; i++) {
			// booksList.push(i);
			booksOT.push(booksList[i]);
		};
		console.log(booksOT)
		this.setState({data:booksOT});
    }

    getNTList(NTbooksstart, NTbooksend) {
    	var booksNT = [];
    	for (var i = NTbooksstart; i <= NTbooksend; i++) {
    		booksNT.push(booksList[i])
    	};
		console.log(booksNT)
		this.setState({data:booksNT});
    }

    getALLList(OTbooksstart, NTbooksend) {
      	var booksALL = [];
      	for (var i = OTbooksstart; i <= NTbooksend; i++) {
      		booksALL.push(booksList[i])
      	};
      	this.setState({data:booksALL});
    }

	onItemClick(bookNo) {
  		// global.book = bookNo.toString();
  		this.props.store.bookId = bookNo.toString();
	}
     
	handleSelect(key) {
		this.setState({key});
	}

	goToTab(key) {
		var _this = this;
		this.setState({activeTab:key});
		var chap = [];
		const cookieRef = { url: 'http://book.autographa.com', name: 'book' , value: this.props.store.bookId };
        session.defaultSession.cookies.set(cookieRef, (error) => {
            if (error)
            console.log(error);
        });
        
        	console.log("key"+key)
        	var id = 'eng_udb' + '_' + bookCodeList[parseInt(this.props.store.bookId, 10) - 1]
			var getData = refDb.get(id).then(function(doc) {
				return doc.chapters.length;
			}).catch(function(err){
				console.log(err);
			})

			getData.then((length) => {
				console.log(length)
				_this.props.store.chapterLength = length;
			});
        // console.log(this.props.store.chapterLength)
	}

	getValue(chapter){
		this.props.store.chapterId = chapter;
		const cookiechapter = { url: 'http://chapter.autographa.com', name: 'chapter' , value: chapter.toString() };
        session.defaultSession.cookies.set(cookiechapter, (error) => {
            if (error)
            console.log(error);
        });
		this.state.onModalClose();
	}

	render() {

	 	const { bookId } = this.props.store;
	 	const { chapterLength } = this.props.store;
	 	console.log(chapterLength)
 		const test = (this.state.activeTab == 1);
 		var chapterList = [];
 		for(var i=0; i<chapterLength; i++){
			chapterList.push( <li key={i} value={i+1} ><a href="#" className={(i+1 == this.props.store.chapterId) ? 'link-active': ""} onClick = { this.getValue.bind(this,  i+1) } >{i+1}</a></li> );
		}

	    return ( 
	    <Tabs animation={false} activeKey={this.state.activeTab} onSelect={() =>this.goToTab((this.state.activeTab == 1) ? 2 : 1)} id="noanim-tab-example">
		     {test ? (
	        <div className="wrap-center">
					    <div className="btn-group" role="group" aria-label="...">
	                        <button className="btn btn-primary" type="button" id="allBooksBtn" data-toggle="tooltip" data-placement="bottom" title=""onClick = { this.getALLList.bind(this, this.state.OTbooksstart, this.state.NTbooksend) } data-original-title="All">ALL</button>
	                        <button className="btn btn-primary" type="button" id="otBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" onClick = { this.getOTList.bind(this, this.state.OTbooksstart, this.state.OTbooksend) } data-original-title="Old Testament">OT</button>
	                        <button className="btn btn-primary" type="button" id="ntBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" onClick = { this.getNTList.bind(this, this.state.NTbooksstart, this.state.NTbooksend) } data-original-title="New Testament">NT</button>
		                </div>	        
		            </div>
	      		) : ''
			}
		    <Tab eventKey={1} title="Book" onClick={() => this.goToTab(2)}>
			    <div className="wrap-center"></div>
	            <div className="row books-li" id="bookdata">
	                <ul id="books-pane">
	                    {

	                    	this.state.data.map((item,index) =>{
								return <li key={index}><a href="#" key={index} onClick = { this.onItemClick.bind(this, index+1) } value={item} className={(index+1 == this.state.bookNo) ? 'link-active': ""} >{item}
								</a></li>
							})
	                    }	                	
	                </ul>
	            </div>
				<div className= "clearfix"></div>
            </Tab>
		    <Tab eventKey={2} title="Chapters" > 
		    	<div className="chapter-no">
            		<ul id="chaptersList">
            			{
            				chapterList
            			}
            		</ul>
            	</div>
            </Tab>
  		</Tabs>
      )
	}
}

module.exports = BookList