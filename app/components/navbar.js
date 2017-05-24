import React from 'react';
import ReactDOM from 'react-dom';
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const Col = require('react-bootstrap/lib/Col');
const Row = require('react-bootstrap/lib/Row')
const Grid = require('react-bootstrap/lib/Grid')
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const Constant = require("../util/constants");
import { observer } from "mobx-react"
import TodoStore from "./TodoStore"
import SettingsModal from "./settings"
import AboutUsModal from "./about"
import TranslationPanel  from '../components/translation_panel';
const refDb = require(`${__dirname}/../util/data-provider`).referenceDb();
const db = require(`${__dirname}/../util/data-provider`).targetDb();
const injectTapEventPlugin = require("react-tap-event-plugin");
import  Footer  from '../components/footer';
import  ReferencePanel  from '../components/reference_panel';
injectTapEventPlugin();

@observer
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        
        this.getData = this.getData.bind(this);
        // this.onItemClick = this.onItemClick.bind(this);
        this.state = {
            showModal: false,
            showModalSettings: false,
            data: Constant,
            chapData: [],
            bookNo:1,
            defaultRef: 'eng_ulb'
        };
        var verses,chunks,chapter;
        var that = this;
        session.defaultSession.cookies.get({ url: 'http://refs.autographa.com' }, (error, refCookie) => {
            if(refCookie.length > 0){
                TodoStore.refId = refCookie[0].value;
            }
        });
        session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, bookCookie) => {
            if(bookCookie.length > 0){
                TodoStore.bookId = bookCookie[0].value;
                session.defaultSession.cookies.get({ url: 'http://chapter.autographa.com' }, (error, chapterCookie) => {
                    if(chapterCookie[0].value){
                        TodoStore.chapterId = chapterCookie[0].value;
                        db.get(TodoStore.bookId).then(function(doc) {
                            refDb.get('refChunks').then(function(chunkDoc) {
                                verses = doc.chapters[parseInt(TodoStore.chapterId, 10) - 1].verses;
                                chunks = chunkDoc.chunks[parseInt(TodoStore.bookId, 10) - 1];
                                chapter = TodoStore.chapterId
                                that.getRefContents(TodoStore.refId+'_'+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1],chapter.toString(),verses, chunks);
                            })
                        })
                    }
                });
            }else{
                refDb.get("ref_history").then(function(doc) {
                    var bookName = doc.visit_history[0].book; 
                    book = doc.visit_history[0].bookId;
                    chapter = doc.visit_history[0].chapter;
                    TodoStore.bookId = book.toString();
                    TodoStore.chapterId = chapter;
                    db.get(TodoStore.bookId).then(function(doc) {
                    refDb.get('refChunks').then(function(chunkDoc) {
                        verses = doc.chapters[parseInt(TodoStore.chapterId, 10) - 1].verses;
                        chunks = chunkDoc.chunks[parseInt(TodoStore.bookId, 10) - 1];
                        chapter = TodoStore.chapterId
                        that.getRefContents(TodoStore.refId+'_'+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1],chapter.toString(),verses, chunks);
                    })
                })
                    var cookie = { url: 'http://book.autographa.com', name: 'book', value: book.toString() };
                    session.defaultSession.cookies.set(cookie, (error) => {
                        if (error)
                            console.error(error);
                        var cookie = { url: 'http://chapter.autographa.com', name: 'chapter', value: chapter.toString() };
                        session.defaultSession.cookies.set(cookie, (error) => {
                            if (error)
                                console.error(error);
                        });
                    });
                }).catch(function(err) {
                    console.log('Error: While retrieving document. ' + err);
                });
            }
        });
        
        
    }

    getRefContents(id,chapter,verses, chunks) {
        let refContent = refDb.get(id).then(function(doc) { //book code is hard coded for now
            for (var i = 0; i < doc.chapters.length; i++) {
                if (doc.chapters[i].chapter == parseInt(chapter, 10)) { // 1 is chapter number and hardcoded for now
                    break;
                }
            }
            let refString = doc.chapters[i].verses.map(function(verse, verseNum) {
                return '<div data-verse="r' + (verseNum + 1) + '"><span class="verse-num">' + (verseNum + 1) + '</span><span>' + verse.verse + '</span></div>';
            }).join('');
            return refString;
        }).catch(function(err) {
            console.log(err)
        });

        refContent.then((content)=> {
           TodoStore.content = content;
        });

        var translationContent = [];
        var i;
        var chunkIndex = 0;
        var chunkVerseStart; 
        var chunkVerseEnd;
        var chunkGroup = [];
        for (i = 0; i < chunks.length; i++) {
            if (parseInt(chunks[i].chp, 10) === parseInt(chapter, 10)) {
                chunkIndex = i + 1;
                chunkVerseStart = parseInt(chunks[i].firstvs, 10);
                chunkVerseEnd = parseInt(chunks[i + 1].firstvs, 10) - 1;
                break;
            }
        }

        for (i = 1; i <= verses.length; i++) {
            var spanVerseNum = '';
            if (i > chunkVerseEnd) {
                chunkVerseStart = parseInt(chunks[chunkIndex].firstvs, 10);
                if (chunkIndex === chunks.length - 1 || parseInt((chunks[chunkIndex + 1].chp), 10) != chapter) {
                    chunkVerseEnd = verses.length;
                    
                } else {
                    chunkIndex++;
                    chunkVerseEnd = parseInt(chunks[chunkIndex].firstvs, 10) - 1;
                }
            }
            // chunkGroup.push(chunkVerseStart + '-' + chunkVerseEnd);
            var chunk = chunkVerseStart + '-' + chunkVerseEnd;
            translationContent.push(verses[i - 1].verse).toString();
            var spanVerse = chunk 
            chunkGroup.push(spanVerse);
        }
        TodoStore.chunkGroup = chunkGroup;
        TodoStore.translationContent= translationContent;
        // this.setState({chunkGroup: chunkGroup})
    }

    openpopupSettings() {
        TodoStore.showModalSettings = true
    }

    openpopupAboutUs() {
        TodoStore.showModalAboutUs = true
    }

    openpopupBooks(tab) {
        var chap = [];
        TodoStore.showModalBooks = true;
        TodoStore.activeTab = tab;
        TodoStore.bookActive = TodoStore.bookId;
        TodoStore.bookName = Constant.booksList[parseInt(TodoStore.bookId, 10) - 1] 
        TodoStore.chapterActive = TodoStore.chapterId;
        this.getData();
    }

    getData(){
        refDb.get(TodoStore.currentRef +"_"+ Constant.bookCodeList[parseInt(TodoStore.bookId, 10)-1]).then(function(doc) {
            TodoStore.bookChapter["chapterLength"] = doc.chapters.length;
            TodoStore.bookChapter["bookId"] = TodoStore.bookId;
        }).catch(function(err){
            console.log(err);
        })
    }

    onItemClick(bookName) {
        var bookNo;
        console.log(bookName)
        console.log(Constant.booksList)
                for (var i = 0; i < Constant.booksList.length; i++) {
            bookName == Constant.booksList[i]
            console.log(bookName == Constant.booksList[i])
            if (bookName == Constant.booksList[i]) {
                 // console.log(i)
                var bookNo = i+1;
                 console.log(bookNo)
                break;

            };
        };
        TodoStore.bookActive = bookNo;
        TodoStore.bookName = bookName;
        TodoStore.chapterActive = 0;
        var id = TodoStore.currentRef + '_' + bookCodeList[parseInt(bookNo, 10) - 1]
        var getData = refDb.get(id).then(function(doc) {
            return doc.chapters.length;
        }).catch(function(err){
            console.log(err);
        });
        getData.then((length) => {
            TodoStore.bookChapter["chapterLength"] = length;
            TodoStore.bookChapter["bookId"] = bookNo;
        });
    }

     
    handleSelect(key) {
        this.setState({key});
    }
    goToTab(key) {
        var _this = this;
        TodoStore.activeTab = key;
    }

    getValue(chapter, bookId){
        TodoStore.chapterId = chapter;
        TodoStore.bookId = bookId;
        this.saveLastVisit(bookId,chapter);
        const cookiechapter = { url: 'http://chapter.autographa.com', name: 'chapter' , value: chapter.toString() };
        session.defaultSession.cookies.set(cookiechapter, (error) => {
            if (error)
            console.log(error);
        });

        const cookieRef = { url: 'http://book.autographa.com', name: 'book' , value: bookId.toString() };
        session.defaultSession.cookies.set(cookieRef, (error) => {
            if (error)
            console.log(error);
        });

        session.defaultSession.cookies.get({ url: 'http://refs.autographa.com' }, (error, refCookie) => {
            if(refCookie.length > 0){
                var that = this;   
                var verses,chunks,chapter;
                var bkId = TodoStore.bookId.toString();
                db.get(bkId).then(function(doc) {
                    refDb.get('refChunks').then(function(chunkDoc) {
                    verses = doc.chapters[parseInt(TodoStore.chapterId, 10) - 1].verses;
                    chunks = chunkDoc.chunks[parseInt(TodoStore.bookId, 10) - 1];
                    chapter = TodoStore.chapterId
                    that.getRefContents(TodoStore.refId+'_'+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1],chapter.toString(),verses, chunks);
                });
            })
            }else{
                var that = this; 
                var bkId = TodoStore.bookId.toString();  
                var verses,chunks,chapter;
                TodoStore.bookName = Constant.booksList[parseInt(TodoStore.bookId, 10) - 1] 
                db.get(bkId).then(function(doc) {
                    refDb.get('refChunks').then(function(chunkDoc) {
                    verses = doc.chapters[parseInt(TodoStore.chapterId, 10) - 1].verses;
                    chunks = chunkDoc.chunks[parseInt(TodoStore.bookId, 10) - 1];
                    chapter = TodoStore.chapterId;
                    that.getRefContents('eng_ulb'+'_'+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1],chapter.toString(),verses, chunks,);
                    //that.createVerseInputs(verses, chunks, chapter);
                });
            })
            }    
        })
        TodoStore.showModalBooks = false;
    }

    saveLastVisit(book, chapter) {
        refDb.get('ref_history').then(function(doc) {
            doc.visit_history = [{ "book": TodoStore.bookName, "chapter": chapter, "bookId": book }]
            refDb.put(doc).then(function(response) {}).catch(function(err) {
            console.log(err);
            });
        });
    }

    getbookCategory(booksstart, booksend) {
        var booksCategory = [];
        for (var i = booksstart; i <= booksend; i++) {
            // booksList.push(i);
            booksCategory.push(booksList[i]);
        };
        // this.setState({data:booksCategory});
        TodoStore.bookData = booksCategory;
    }

    highlightRef(obj){
        console.log(obj)
        var content = ReactDOM.findDOMNode(this);
/*        let verses = content.getElementsByClassName("verse-input")[0].querySelectorAll("span[id^=v]");
        let refContent = (content.getElementsByClassName('ref-contents')[0].children[0]);
        for (var i = 0; i < verses.length; i++) {
            let refDiv = refContent.DOM.ready('div[data-verse^='+'"'+"r"+(i+1)+'"'+']');
            if (refDiv != 'undefined'){
                refDiv[0].style="background-color:none;font-weight:none;padding-left:10px;padding-right:10px";
            }            
        };*/

        let chunk = document.getElementById(obj).getAttribute("data-chunk-group")
        if(chunk){
            refContent.querySelectorAll('div[data-verse^="r"]').style="background-color: '';font-weight: '';padding-left:10px;padding-right:10px";
            var limits = chunk.split("-").map(function(element) {
                return parseInt(element, 10) - 1;
            });
            for(var j=limits[0]; j<=limits[1];j++){
                refContent.querySelectorAll("div[data-verse=r"+(j+1)+"]")[0].style = "background-color: rgba(11, 130, 255, 0.1);padding-left:10px;padding-right:10px;margin-right:10px";
                                           
            }
           // refContent.querySelectorAll("div[data-verse=r"+(limits[0] + 1) + "]").style = "border-radius: 10px 10px 0px 0px";
           // $('div[data-verse="r' + (limits[0] + 1) + '"]').css({ "border-radius": "10px 10px 0px 0px" });
           //  $('div[data-verse="r' + (limits[1] + 1) + '"]').css({ "border-radius": "0px 0px 10px 10px" });
        }
    }
    
    render() {
        console.log(TodoStore.layout);
        const layout = TodoStore.layout;
        console.log(layout);
        var OTbooksstart = 0;
        var OTbooksend = 38;
        var NTbooksstart= 39;
        var NTbooksend= 65;
        const bookData = TodoStore.bookData
        const refContent = TodoStore.content 
        const bookName = Constant.booksList[parseInt(TodoStore.bookId, 10) - 1]
        let close = () => TodoStore.showModalBooks = false;//this.setState({ showModal: false, showModalSettings: false, showModalBooks: false });
        const test = (TodoStore.activeTab == 1);

        var chapterList = [];
        for(var i=0; i<TodoStore.bookChapter["chapterLength"]; i++){
            chapterList.push( <li key={i} value={i+1} ><a href="#"  className={(i+1 == TodoStore.chapterActive) ? 'link-active': ""} onClick = { this.getValue.bind(this,  i+1, TodoStore.bookChapter["bookId"]) } >{i+1}</a></li> );
        }
        return  (
            <div>
        <Modal show={TodoStore.showModalBooks} onHide = {close} id="tab-books">
            <Modal.Header closeButton>
                <Modal.Title>Book and Chapter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs animation={false} activeKey={TodoStore.activeTab} onSelect={() =>this.goToTab(TodoStore.activeTab == 1? 2 : 1)} id="noanim-tab-example">
             {test ? (
            <div className="wrap-center">
                        <div className="btn-group" role="group" aria-label="...">
                            <button className="btn btn-primary" type="button" id="allBooksBtn" data-toggle="tooltip" data-placement="bottom" title=""onClick = { this.getbookCategory.bind(this, OTbooksstart, NTbooksend) } data-original-title="All">ALL</button>
                            <button className="btn btn-primary" type="button" id="otBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" onClick = { this.getbookCategory.bind(this, OTbooksstart, OTbooksend) } data-original-title="Old Testament">OT</button>
                            <button className="btn btn-primary" type="button" id="ntBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" onClick = { this.getbookCategory.bind(this, NTbooksstart, NTbooksend) } data-original-title="New Testament">NT</button>
                        </div>          
                    </div>
                ) : ''
            }
            <Tab eventKey={1} title="Book" onClick={() => this.goToTab(2)}>
                <div className="wrap-center"></div>
                <div className="row books-li" id="bookdata">
                    <ul id="books-pane">
                        {
                            bookData.map((item,index) =>{
                                return <li key={index}><a href="#" key={index} onClick = { this.onItemClick.bind(this, item) } value={item} className={( TodoStore.bookName == item ) ? 'link-active': ""}  >{item}
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
                        { chapterList }
                    </ul>
                </div>
            </Tab>
        </Tabs>
            </Modal.Body>
        </Modal>
         <SettingsModal show={TodoStore.showModalSettings} />
         <AboutUsModal show={TodoStore.showModalAboutUs} />
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                        <a href="javascript:;" className="navbar-brand" ><img alt="Brand" src="../assets/images/logo.png"/></a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="nav navbar-nav" style={{padding: "3px 0 0 0px"}}>
                            <li>
                                <div className="btn-group navbar-btn strong verse-diff-on" role="group" aria-label="..." id="bookBtn" style={{marginLeft:"200px"}}>
                                    <a onClick={() => this.openpopupBooks(1)} href="#" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">{bookName}</a>
                                    <span id="chapterBtnSpan">
                                    <a onClick={() => this.openpopupBooks(2)} className="btn btn-default" id="chapterBtn" data-target="#myModal"  data-toggle="modal" data-placement="bottom"  title="Select Chapter" >{TodoStore.chapterId}</a>
                                    </span>
                                </div>                               
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right nav-pills verse-diff-on">
                            <li style={{padding: "17px 5px 0 0", color: "#fff", fontWeight: "bold"}}><span>OFF</span></li>
                            <li>
                                <label style={{marginTop:"17px"}} className="sml-switch sml-js-switch sml-js-ripple-effect" htmlFor="switch-2" id="switchLable" data-toggle='tooltip' data-placement='bottom' title="Compare mode">
                                    <input type="checkbox" id="switch-2" className="sml-switch__input check-diff"/>
                                    <span className="sml-switch__label"></span>
                                </label>                               
                            </li>
                            <li style={{padding:"17px 0 0 0", color: "#fff", fontWeight: "bold"}}><span>ON</span></li>
                            <li>
                                <a href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="Find and replace" id="searchText"><i className="fa fa-search fa-2x"></i></a>
                            </li>
                            <li>
                                <a href="#" data-toggle="tooltip" data-placement="bottom" title="Export as USFM" id="export-usfm"><i className="fa fa-cloud-download fa-2x"></i>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => this.openpopupAboutUs()} href="#" data-target="#aboutmodal" data-toggle="tooltip" data-placement="bottom" title="About" id="btnAbout"><i className="fa fa-info fa-2x"></i></a>
                            </li>
                            <li><a onClick={() => this.openpopupSettings()} href="javascript:;" id="btnSettings" data-target="#bannerformmodal" data-toggle="tooltip" data-placement="bottom" title="Settings"><i className="fa fa-cog fa-2x"></i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {layout == 2 &&
                  <Grid>
                    <Row>
                        <Col sm={4}><TranslationPanel /></Col>
                        <Col sm={4}><TranslationPanel /></Col>
                        <Col sm={4}><ReferencePanel  /></Col>
                    </Row>
                </Grid>
                  }
            {layout == 3 &&
                 <Grid>
                    <Row>
                        <Col sm={3}><TranslationPanel /></Col>
                        <Col sm={3}><TranslationPanel /></Col>
                        <Col sm={3}><TranslationPanel /></Col>
                        <Col sm={3}><ReferencePanel  /></Col>                    
                    </Row>
                </Grid>
                } 
                {layout == 1   &&
               <Grid>
                    <Row>
                        <Col sm={6}><TranslationPanel/></Col>
                        <Col sm={6}><ReferencePanel  highlightRef={this.highlightRef.bind(this)}/></Col>
                    </Row>
                </Grid>
                  }  
            <Footer onSave={this.saveTarget}/>
        </div>
        )
    }
}
module.exports = Navbar
