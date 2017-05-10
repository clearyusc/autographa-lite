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
 const refDb = require(`${__dirname}/../util/data-provider`).referenceDb();


class BookList extends React.Component {
	constructor(props) {
        super(props);
        global.highlight = '1';
        this.onItemClick = this.onItemClick.bind(this);
        this.state = { 
            data: Constant.booksList,
            chapterData:[],
            book: 1,
            activeTab:props.activeTab,
            chapterData:props.chapData,
            currentChapter:1,
            onModalClose:props.onModalClose,
            bookNo:1,
            OTbooksstart:1,
            OTbooksend:38,
            NTbooksstart: 39,
            NTbooksend: 65
    	};
    	 session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, cookie) => {
            if (cookie.length > 0) {
                var bookNo = cookie[0].value;
                this.setState({bookNo:bookNo})
            } else {
                console.log("else");
            }   
        });
      	session.defaultSession.cookies.get({ url: 'http://chapter.autographa.com' }, (error, cookie) => {
            if (cookie.length > 0) {    
                global.bookChapter= cookie[0].value
            }else {
                global.bookChapter = 1;
                console.log("chapter else");
            }

		})
    }

	componentWillReceiveProps(nextProps) {
      this.setState({ chap: nextProps.chap });  
      this.setState({chapterData:nextProps.chapData})
    }

    getCategoryBookList(bookStart, bookEnd) {
      	var booksALL = [];
      	for (var i = bookStart; i <= bookEnd; i++) {
      		booksALL.push(Constant.booksList[i])
      	};
      	this.setState({data:booksALL});
    }

	onItemClick(bookNo) {
  		global.book = bookNo.toString();
	}	

	goToTab(key) {
		this.setState({activeTab:key});
		var chap = [];
		global.bookChapter ='';

		let bookNo = global.book;
		if(!bookNo){
			bookNo = '1';
		}
		var id = 'eng_udb' + '_' + Constant.bookCodeList[parseInt(bookNo, 10) - 1]
		var getData = refDb.get(id).then(function(doc) {
			doc.chapters.forEach(function(ref_doc) {
		    	chap.push({ number: ref_doc.chapter });
			})
			return chap
		}).catch(function(err){
			console.log(err);
		})

		getData.then((item) =>{
			if(item  && item.length)
			this.setState({chapterData:item})
		})
	}

	getValue(chapter){
		const cookieBook = { url: 'http://book.autographa.com', name: 'book' , value: global.book };
        session.defaultSession.cookies.set(cookieBook, (error) => {
            if (error)
            console.log(error);
        });
        var chap = chapter.toString();
		const cookieChapter = { url: 'http://chapter.autographa.com', name: 'chapter' , value: chap };
        session.defaultSession.cookies.set(cookieChapter, (error) => {
            if (error)
            console.log(error);
        });
         session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, cookie) => {
            if (cookie.length > 0) {
                var bookNo = cookie[0].value;
                this.setState({bookNo:bookNo})
            } else {
            	 var bookNo = cookie[0].value;
                this.setState({bookNo:bookNo})
                console.log("else of bookNo");
            }   
        });
		global.bookChapter = chapter
		console.log(this.state.bookNo + global.book);
		if (this.state.bookNo == global.book) {
			console.log();
			global.bookName = this.state.data[parseInt(this.state.bookNo, 10) - 1];
		} else {
			console.log("in else");
			global.bookName = this.state.data[parseInt(global.book, 10) - 1];
		}
		this.state.onModalClose();
	}

	render() {		
 	const test = (this.state.activeTab == 1);
	    return ( 
	    <Tabs animation={false} activeKey={this.state.activeTab} onSelect={() =>this.goToTab((this.state.activeTab == 1) ? 2 : 1)} id="noanim-tab-example">
		     {test ? (
	        <div className="wrap-center">
					    <div className="btn-group" role="group" aria-label="...">
	                        <button className="btn btn-primary" type="button" id="allBooksBtn" data-toggle="tooltip" data-placement="bottom" title=""onClick = { this.getCategoryBookList.bind(this, this.state.OTbooksstart, this.state.NTbooksend) } data-original-title="All">ALL</button>
	                        <button className="btn btn-primary" type="button" id="otBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" onClick = { this.getCategoryBookList.bind(this, this.state.OTbooksstart, this.state.OTbooksend) } data-original-title="Old Testament">OT</button>
	                        <button className="btn btn-primary" type="button" id="ntBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" onClick = { this.getCategoryBookList.bind(this, this.state.NTbooksstart, this.state.NTbooksend) } data-original-title="New Testament">NT</button>
		                </div>	        
		            </div>
	      		) : ''}
		    <Tab eventKey={1} title="Book" onClick={() => this.goToTab(2)}>
			    <div className="wrap-center"></div>
	            <div className="row books-li" id="bookdata">
	                <ul id="books-pane">
	                    {
	                    	this.state.data.map((item,index) =>{
								return <li key={index}><a href="#" key={index} onClick = { this.onItemClick.bind(this,index+1) } value={item} className={(index+1 == this.state.bookNo) ? 'link-active': ""} >{item}
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
            				this.state.chapterData.map((item, i) => {
								return ( <li key={i} value={i+1} ><a href="#" className={(i+1 == global.bookChapter) ? 'link-active': ""} onClick = { this.getValue.bind(this,  i+1) }>{i+1}</a></li> );
							})  
            			}
            		</ul>
            	</div>
            </Tab>
  		</Tabs>
      )
	}
}

module.exports = BookList