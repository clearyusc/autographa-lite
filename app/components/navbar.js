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
 const Tabs = require('react-bootstrap/lib/Tabs');
 const Tab = require('react-bootstrap/lib/Tab');

class Navbar extends React.Component 
{
     constructor(props) {
          super(props);
    this.state = { showModal: false };      
    
    } 

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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
    let close = () => this.setState({showModal:false});
        return(
    <div>
        
       

        <Modal show={this.state.showModal} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
            <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
            <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
            <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
          </Tabs>
            <div role="tabpanel" className="selected">
                        <div className="container-fluid">
                               {/* <div className="row">*/}
                        <Col lg={12}>
                            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                                <div className="mdl-tabs__tab-bar">
                                    <a href="#overview-tab" id="overviewtab" className="mdl-tabs__tab is-active">Overview</a>
                                    <a href="#license-tab" id="licensetab" className="mdl-tabs__tab">License</a>
                                </div>
                            <div className="mdl-tabs__panel is-active" id="overview-tab">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <img src="../assets/images/autographa_lite_large.png" class="img-circle" alt="Cinque Terre" width="215" height="200" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h3>Autographa Lite</h3>
                                        <p>Version 0.1</p>
                                        <p>Source code hosted at: https://github.com/Bridgeconn/autographa-lite</p>
                                    </div>
                                </div>
                            </div>
                                <div className="mdl-tabs__panel" id="license-tab" style={{height: "306px", overflowY: "scroll", overflowX : "scroll"}}>
                                      <h4> The MIT License (MIT)</h4>
                                      <p>Released in 2017 by Friends of Agape (www.friendsofagape.org) in partnership with RUN Ministries (www.runministries.org). </p>
                                      <br />
                                      <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
                                      <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                                      <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
                                     
                                </div>
                            </div>
                        </Col>
                        {/*</div>*/}
                    </div>
                    </div>
          </Modal.Body>
          {/*<Modal.Footer>
            // <Button eventKey={1} onClick={() => this.close()}>Close</Button>
          </Modal.Footer>*/}
        </Modal>
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                        <a className="navbar-brand" href="javascript:;"><img alt="Brand" src="../assets/images/logo.png"/></a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="nav navbar-nav" style={{padding: "3px 0 0 0px"}}>
                            <li>
                                <div className="btn-group navbar-btn strong verse-diff-on" role="group" aria-label="..." id="bookBtn" style={{marginLeft:"200px"}}>
                                    <a href="#"  className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">Genesis
                                    </a>
                                    <span id="chapterBtnSpan">
                                    <a className="btn btn-default" id="chapterBtn" data-target="#myModal" href="javascript:getBookChapterList('1');" data-toggle="modal" data-placement="bottom"  title="Select Chapter" >1</a>
                                    </span>
                                </div>
                                
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right nav-pills verse-diff-on">
                            <li style={{padding: "17px 5px 0 0", color: "#fff", fontWeight: "bold"}}><span>OFF</span></li>
                            <li>
                                <label style={{marginTop:"17px"}} className="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-2" id="switchLable" data-toggle='tooltip' data-placement='bottom' title="Compare mode">
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
                                <a eventKey={0} onClick={() => this.open()} href="#" data-target="#aboutmodal" data-toggle="tooltip" data-placement="bottom" title="About" id="btnAbout"><i className="fa fa-info fa-2x"></i></a>
                            </li>
                            <li><a href="javascript:;" id="btnSettings" data-target="#bannerformmodal" data-toggle="tooltip" data-placement="bottom" title="Settings"><i className="fa fa-cog fa-2x"></i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        )
    }
}
module.exports = Navbar