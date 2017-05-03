import React from 'react';
import ReactDOM from 'react-dom';
import Contentbox  from './contentbox';
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
 // import {Tabs, Tab} from 'material-ui/Tabs';
 // const Tabsreact = require('react-bootstrap/lib/Tabs');
 // const Tabreact = require('react-bootstrap/lib/Tabs');
 const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        global.bookChapter = "1",
        global.bookName = "Genesis"
        this.state = {
            showModal: false,
            showModalSettings: false,
            showModalBooks: false,
            data: booksList,
            defaultBook: Constant.bookCodeList[parseInt('1', 10) - 1],
            defaultChapter: 1,
            chapData: null,
            bookNo:1,
            defaultRef: 'eng_ulb'
        };
        session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, cookie) => {
            if (cookie.length > 0) {
                var bookNo = cookie[0].value;
                this.setState({bookNo:bookNo})
                global.bookName = Constant.bookCodeList[parseInt(bookNo, 10) - 1]
                this.setState({currentBook: global.bookName})
                console.log("in iF");
                console.log();
            } else {
                console.log("else");
                this.setState({currentBook: Constant.bookCodeList[parseInt(this.state.bookNo, 10) - 1]});
            }   
        });

         session.defaultSession.cookies.get({ url: 'http://refs.autographa.com' }, (error, cookie) => {
            if (cookie.length > 0) {    
                this.setState({defaultRef: cookie[0].value})
                console.log(cookie)
                this.getRefContents(cookie[0].value+'_'+bookCodeList[parseInt(this.state.bookNo, 10) - 1]);
            }else {
                this.getRefContents(this.state.defaultRef+'_'+bookCodeList[parseInt(this.state.bookNo, 10) - 1]);
            }
        });  
    }

    close() {
        this.setState({
            showModalBooks: false
        });
    }

    toggleShowModal() {
        this.getRefContents(this.state.defaultRef+'_'+bookCodeList[parseInt(this.state.bookNo, 10) - 1])
        global.bookNumber = global.book
        this.setState({ showModalBooks: !this.state.showModalBooks });     
    }

     getRefContents(id) {
        console.log(id);
        let refContent = refDb.get(id).then(function(doc) { //book code is hard coded for now
            for (var i = 0; i < doc.chapters.length; i++) {
                if (doc.chapters[i].chapter == parseInt(1, 10)) { // 1 is chapter number and hardcoded for now
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
            this.setState({content: content})
        })
        console.log(this.state.content);
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
        this.setState({
            showModalBooks: true,
            activeTab: tab
        });
        session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, cookie) => {
            if (cookie.length > 0) {
                var bookNo = cookie[0].value;
                this.setState({bookNo:bookNo})
                var bookName = Constant.bookCodeList[parseInt(bookNo, 10) - 1]
                this.setState({currentBook: bookName})
                console.log(this.state.currentBook);
            } else {
                console.log("else");
                this.setState({currentBook: Constant.bookCodeList[parseInt(this.state.bookNo, 10) - 1]});
            }       
        });

        var bookno = this.state.currentBook
        console.log(bookno);
        var getData = refDb.get('eng_udb_' + bookno).then(function(doc) {
            doc.chapters.forEach(function(ref_doc) {
                chap.push({ number: chapter });
            })
            return chap
        })
        getData.then((item) => {
           setTimeout(function(){ this.setState({ chapData: item });}.bind(this), 100);
        })
    }

    render() {

        //    const popover = (
        //   <Popover id="modal-popover" title="popover">
        //   </Popover>
        // );
        // const tooltip = (    
        //   <Tooltip id="modal-tooltip">
        //     wow.
        //   </Tooltip>
        // );
        let close = () => this.setState({ showModal: false, showModalSettings: false, showModalBooks: false });
        return (

            <div>
        <Modal show={this.state.showModalBooks} onHide={close} >
            <Modal.Header closeButton>
                <Modal.Title>Book and Chapter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <BookList activeTab={this.state.activeTab} chapData={this.state.chapData} onModalClose={this.toggleShowModal.bind(this)}/>
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
          {/*<Tabs id="noanim-tabexample" value={this.state.value} onChange={this.handleChange}>
            <Tab label="Overview">
                <div className="row">
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
            <Tab label="License">
        <div >
            <h4> The MIT License (MIT)</h4>
                <p>Released in 2017 by Friends of Agape (www.friendsofagape.org) in partnership with RUN Ministries (www.runministries.org). </p>
                <br />
                <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
                <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
        </div>
            </Tab>
          </Tabs>*/}
           
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
                                    <a onClick={() => this.openpopupBooks(1)} href="#" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">{global.bookName}</a>
                                    <span id="chapterBtnSpan">
                                    <a onClick={() => this.openpopupBooks(2)} className="btn btn-default" id="chapterBtn" data-target="#myModal"  data-toggle="modal" data-placement="bottom"  title="Select Chapter" >{global.bookChapter}</a>
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
            <Contentbox selectedBook = {this.state.bookNo} selectedChapter={global.bookChapter} content={this.state.content}/>
        </div>
        )
    }
}
module.exports = Navbar
