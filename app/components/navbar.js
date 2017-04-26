const React = require('react')
const ReactDOM = require('react-dom')
// const style = require("./Style");
// const Nav = require('react-bootstrap/lib/Nav');
// const NavItem = require('react-bootstrap/lib/NavItem');
// const Navbar = require('react-bootstrap/lib/Navbar');
// const NavDropdown = require('react-bootstrap/lib/NavDropdown');
// const MenuItem = require('react-bootstrap/lib/MenuItem');
// const MilestoneManagement = require('./milestone_management');
 const Modal = require('react-bootstrap/lib/Modal');
 const Button = require('react-bootstrap/lib/Button');
 const Col = require('react-bootstrap/lib/Col');
 // const Tabs = require('react-bootstrap/lib/Tabs');
 // const Tab = require('react-bootstrap/lib/Tab');
 const Constant = require("../util/constants");
 const BookList = require("./booklist");
 import TextField from 'material-ui/TextField';
 import {Tabs, Tab} from 'material-ui/Tabs';
 const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
  function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

class Navbar extends React.Component 
{
     constructor(props) {
        super(props);
        this.state = { 
            showModal: false,
            showModalSettings:false,
            showModalBooks:false,
            data: booksList,
            defaultBook: Constant.bookCodeList[parseInt(1, 10) - 1],
            defaultChapter: 1,
            chapData:null
        };
    } 

  close() {
    this.setState({ 
        showModal: false,
        showModalSettings:false,
        showModalBooks:false 
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
    this.setState({ 
       showModalBooks:true,
       activeTab:tab 
    });
    console.log(this.state.defaultBook);
    var chap = [];
        var getData = refDb.get('eng_udb_'+this.state.defaultBook).then(function(doc) {
             doc.chapters.forEach(function(ref_doc) {
            chap.push({ number: chapter });
            })      
            return chap
            console.log(chap)
        })
        
        getData.then((item) =>{
            this.setState({chapData:item})
        })
  }



    render() 
    {
    //        const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    // const tooltip = (
    //   <Tooltip id="modal-tooltip">
    //     wow.
    //   </Tooltip>
    // );
     let close = () => this.setState({showModal:false, showModalSettings:false, showModalBooks:false });
        return(
    <div>
        <Modal show={this.state.showModalBooks} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Book and Chapter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <BookList activeTab={this.state.activeTab} chapData={this.state.chapData}/>

          </Modal.Body>
        </Modal>

       <Modal show={this.state.showModalSettings} onHide={close} id="tab-settings">
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
                        <div className="alert alert-success" role="alert" style= {{display: "none"}}><span>You successfully read this important alert message.</span></div>
                        <div className="alert alert-danger" role="alert" style= {{display: "none", position: "relative"}}><span>Change a few things up and try submitting again.</span></div>
          </Modal.Header>
          <Modal.Body>
           <Tabs id="noanim-tab-example" style={{width: "850px"}}>
            <Tab label="Translation Details" >
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
                            <button style={{float: "right", marginRight: "33px"}} className="btn btn-success" id="ref-import-btn">Import</button>
                            <div className= "clearfix"></div>
            </Tab>
            <Tab label="Import Translation" >
                    <div className="form-group">
                        <label>Folder Location</label><br />
                        {/*<input type="text" id="ref-path" placeholder="Path of folder containing USFM files" />*/}
                        <TextField hintText="Path of folder containing USFM files" />
                    </div>
            </Tab>
            <Tab label="Import Reference Text" >
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
            </div>
                            <button style={{float: "right", marginRight: "33px"}} className="btn btn-success" id="ref-import-btn">Import</button>
                <div className= "clearfix"></div>
            </Tab>
            <Tab label="Manage Reference Texts">
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
            </Tab>
          </Tabs>
          </Modal.Body>
        </Modal>




         <Modal show={this.state.showModal} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Tabs id="noanim-tabexample">
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
                                    <a onClick={() => this.openpopupBooks(1)} href="#" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">{this.state.defaultBook}</a>
                                    <span id="chapterBtnSpan">
                                    <a onClick={() => this.openpopupBooks(2)} className="btn btn-default" id="chapterBtn" data-target="#myModal"  data-toggle="modal" data-placement="bottom"  title="Select Chapter" >{this.state.defaultChapter}</a>
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
                                <a onClick={() => {this.open(); this.getBookChapterList()}} href="#" data-target="#aboutmodal" data-toggle="tooltip" data-placement="bottom" title="About" id="btnAbout"><i className="fa fa-info fa-2x"></i></a>
                            </li>
                            <li><a onClick={() => this.openpopup()} href="javascript:;" id="btnSettings" data-target="#bannerformmodal" data-toggle="tooltip" data-placement="bottom" title="Settings"><i className="fa fa-cog fa-2x"></i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        )
    }
}
module.exports = Navbar