import React from 'react';
import ReactDOM from 'react-dom';
// const style = require("./Style");
 const Nav = require('react-bootstrap/lib/Nav');
 const NavItem = require('react-bootstrap/lib/NavItem');
// const Navbar = require('react-bootstrap/lib/Navbar');
// const NavDropdown = require('react-bootstrap/lib/NavDropdown');
// const MenuItem = require('react-bootstrap/lib/MenuItem');
// const MilestoneManagement = require('./milestone_management');


const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const Col = require('react-bootstrap/lib/Col');
const Row = require('react-bootstrap/lib/Row')
const Grid = require('react-bootstrap/lib/Grid')
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const Constant = require("../util/constants");
const BookList = require("./booklist");
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { observer } from "mobx-react"
import TodoStore from "./TodoStore"
import Contentbox  from '../components/contentbox';
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

@observer
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
            showModal: false,
            showModalSettings: false,
            data: Constant,
            chapData: [],
            bookNo:1,
            defaultRef: 'eng_ulb'
        };
         session.defaultSession.cookies.get({ url: 'http://refs.autographa.com' }, (error, refCookie) => {
            if(refCookie.length > 0){
                TodoStore.refId = refCookie[0].value;
                session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, bookCookie) => {
                if(bookCookie.length > 0){
                    TodoStore.bookId = bookCookie[0].value;
                    session.defaultSession.cookies.get({ url: 'http://chapter.autographa.com' }, (error, chapterCookie) => {
                      if(chapterCookie[0].value){
                        TodoStore.chapterId = chapterCookie[0].value;
                        this.getRefContents(TodoStore.refId+'_'+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1], TodoStore.chapterId.toString());
                      }else{
                        TodoStore.chapterId = '1';
                        this.getRefContents(TodoStore.refId+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1], TodoStore.chapterId.toString());

                      }
                    })
                }else{
                    TodoStore.bookId = '1';
                    TodoStore.chapterId = '1';
                    this.getRefContents(TodoStore.currentRef+"_"+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1], TodoStore.chapterId.toString());

                }
            });  
            }else{
                TodoStore.bookId = '1';
                TodoStore.chapterId = '1';
                TodoStore.refId = 'eng_ulb_';
                this.getRefContents(TodoStore.refId+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1], TodoStore.chapterId.toString());
            }
        });
    }

    close() {
        TodoStore.showModalBooks = false
        
    }

    toggleShowModal() {
        TodoStore.showModalBooks = true
    }

    getRefContents(id, chapter) {
        console.log(id+chapter);
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
            TodoStore.bookChapterContent = content;
            this.setState({change: "test"})
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    openpopup() {
        this.setState({
            showModalSettings: true
        });
    }

    openpopupBooks(tab) {
        var chap = [];
        TodoStore.showModalBooks = true;
        TodoStore.activeTab = tab;
        TodoStore.bookActive = TodoStore.bookId;
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

    onItemClick(bookNo) {
        TodoStore.bookActive = bookNo;
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
                this.getRefContents(refCookie[0].value+'_'+bookCodeList[parseInt(bookId, 10) - 1],chapter.toString())
            }else{
                this.getRefContents('eng_ulb'+'_'+bookCodeList[parseInt(bookId, 10) - 1],chapter.toString())
            }    
        })

        TodoStore.showModalBooks = false;
    }
    getOTList(OTbooksstart, OTbooksend) {
        var booksOT = [];
        for (var i = OTbooksstart; i <= OTbooksend; i++) {
            // booksList.push(i);
            booksOT.push(booksList[i]);
        };
        this.setState({data:booksOT});
    }

    getNTList(NTbooksstart, NTbooksend) {
        var booksNT = [];
        for (var i = NTbooksstart; i <= NTbooksend; i++) {
            booksNT.push(booksList[i])
        };
        this.setState({data:booksNT});
    }

    getALLList(OTbooksstart, NTbooksend) {
        var booksALL = [];
        for (var i = OTbooksstart; i <= NTbooksend; i++) {
            booksALL.push(booksList[i])
        };
        this.setState({data:booksALL});
    }

    render() {
        const bookName = Constant.booksList[parseInt(TodoStore.bookId, 10) - 1]
        let close = () => TodoStore.showModalBooks = false;//this.setState({ showModal: false, showModalSettings: false, showModalBooks: false });
        const test = (this.state.activeTab == 1);
        var chapterList = [];
        for(var i=0; i<TodoStore.bookChapter["chapterLength"]; i++){
            chapterList.push( <li key={i} value={i+1} ><a href="#"  className={(i+1 == TodoStore.chapterActive) ? 'link-active': ""} onClick = { this.getValue.bind(this,  i+1, TodoStore.bookChapter["bookId"]) } >{i+1}</a></li> );
        }
        return (
            <div>
        <Modal show={TodoStore.showModalBooks} onHide = {close} >
            <Modal.Header closeButton>
                <Modal.Title>Book and Chapter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs animation={false} activeKey={TodoStore.activeTab} onSelect={() =>this.goToTab(TodoStore.activeTab == 1? 2 : 1)} id="noanim-tab-example">
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

                            Constant.booksList.map((item,index) =>{
                                return <li key={index}><a href="#" key={index} onClick = { this.onItemClick.bind(this, index+1) } value={item} className={( TodoStore.bookActive == index + 1 ) ? 'link-active': ""}  >{item}
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

        <Modal show={this.state.showModalSettings} onHide={close} id="tab-settings">
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
                <div class="alert alert-success" role="alert" style= {{display: "none"}}><span>You successfully read this important alert message.</span></div>
                <div class="alert alert-danger" role="alert" style= {{display: "none", position: "relative"}}><span>Change a few things up and try submitting again.</span></div>
          </Modal.Header>
          <Modal.Body>
             <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                          <NavItem eventKey="first">
                            Translation Details
                          </NavItem>
                          <NavItem eventKey="second">
                            Import Translation
                          </NavItem>
                          <NavItem eventKey="third">
                            Import Reference Text
                          </NavItem>
                          <NavItem eventKey="fourth">
                            Manage Reference Texts
                          </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation>
                          <Tab.Pane eventKey="first">
                            <div className="form-group">
                                   <label htmlFor="ref-lang-code">Language Code</label><br />
                                {/*<input type="text" id="ref-lang-code" placeholder="eng" />*/}
                                    <TextField hintText="eng" />
                                </div>
                                 <div id="reference-lang-result" className="lang-code">
                                 <input type="hidden" id="langCode" />
                                </div>
                               <div className="form-group">
                                    <label>Version</label><br />
                                    {/*<input type="text" id="ref-version" placeholder="NET-S3" />*/}
                                    <TextField hintText="NET-S3" />
                                </div>
                           <div className="form-group">
                                    <label htmlFor="ref-path">Path to Folder Location</label><br />
                                    {/*<input type="text" id="ref-path" placeholder="Path of folder containing USFM files" />*/}
                                    <TextField hintText="Path of folder containing USFM files" />
                          </div>
                        {/*<button style={{float:"right", marginRight: "33px"}} className="btn btn-success" id="save-settings">Save</button>*/}
                        <RaisedButton label="Save" primary={true}/>  
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                             <div className="form-group">
                                <label>Folder Location</label><br />
                                {/*<input type="text" id="ref-path" placeholder="Path of folder containing USFM files" />*/}
                                <TextField hintText="Path of folder containing USFM files" />
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="third">
                            <div className="form-group">
                                <div >
                                    <label htmlFor="ref-name">Bible name</label><br />
                                    {/*<input  className="mdl-textfield__input" type="text" id="ref-name" placeholder="New English Translation" />*/}
                                    <TextField hintText="New English Translation" />

                                </div>
            
                                <div >
                                   <label htmlFor="ref-lang-code">Language Code</label><br />
                                   {/*<input type="text" id="ref-lang-code" placeholder="eng" />*/}  
                                   <TextField hintText="eng" />
                                </div>
                                <div id="reference-lang-result" className="lang-code"></div>
                                <input type="hidden" id="langCode" />
            
                                <div >
                                    <label  htmlFor="version">Version</label><br />
                                    {/*<input type="text" id="ref-version" placeholder="NET-S3" />*/}
                                    <TextField hintText="NET-S3" />
                                </div>
            
                                <div >
                                    <label htmlFor="ref-path">Folder Location</label><br />
                                    {/*<input type="text" id="ref-path" placeholder="Path of folder containing USFM files" />*/}
                                    <TextField hintText="Path of folder containing USFM files" />
                                </div>
                                {/*<button style={{float:"right", marginRight: "33px"}} class="btn btn-success" id="ref-import-btn">Import</button>*/}
                                <RaisedButton label="Import" primary={true}/>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="fourth">
                            <div>
                                <table className="table table-bordered table-hover table-striped">
                                    <th>Name</th>
                                    <th>Language Code</th>
                                    <th>Version</th>
                                    <th>Action</th>
                                    <tbody id="reference-list">
                                    </tbody>
                                </table>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
          </Modal.Body>
        </Modal>
         <Modal show={this.state.showModal} onHide={close} id="tab-about">
          <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Overview"><div className="row">
                    <div className="col-xs-6">
                            <img src="../assets/images/autographa_lite_large.png" className="img-circle" alt="Cinque Terre" width="215" height="200" />
                        </div>
                        <div className="col-xs-6">
                            <h3>Autographa Lite</h3>
                            <p>Version 0.1</p>
                            <p>Source code hosted at: https://github.com/Bridgeconn/autographa-lite</p>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey={2} title="License">
                    <div style={{overflowY: "scroll", height: "255px"}}>
                        <h4> The MIT License (MIT)</h4>
                            <p>Released in 2017 by Friends of Agape (www.friendsofagape.org) in partnership with RUN Ministries (www.runministries.org). </p>
                            <br />
                            <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
                            <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
                    </div>
                </Tab>
          </Tabs>
          
           
          </Modal.Body>
        </Modal>
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
                                <label style={{marginTop:"17px"}} className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-2" id="switchLable" data-toggle='tooltip' data-placement='bottom' title="Compare mode">
                                    <input type="checkbox" id="switch-2" className="mdl-switch__input check-diff"/>
                                    <span className="mdl-switch__label"></span>
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
                                <a onClick={() => this.open()} href="#" data-target="#aboutmodal" data-toggle="tooltip" data-placement="bottom" title="About" id="btnAbout"><i className="fa fa-info fa-2x"></i></a>
                            </li>
                            <li><a onClick={() => this.openpopup()} href="javascript:;" id="btnSettings" data-target="#bannerformmodal" data-toggle="tooltip" data-placement="bottom" title="Settings"><i className="fa fa-cog fa-2x"></i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Contentbox />
        </div>
        )
    }
}
module.exports = Navbar
