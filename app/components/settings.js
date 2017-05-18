import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
const session =  require('electron').remote.session;
const Constant = require("../util/constants")
import { dialog } from 'electron';
import { remote } from 'electron';
const refDb = require(`${__dirname}/../util/data-provider`).referenceDb();
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const Col = require('react-bootstrap/lib/Col');
const Row = require('react-bootstrap/lib/Row')
const Grid = require('react-bootstrap/lib/Grid')
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TodoStore from "./TodoStore"


var SettingsModal = function(props) {
    let closeSetting = () => TodoStore.showModalSettings = false
  return (  
    <Modal show={props.show} onHide={closeSetting} id="tab-settings">
        <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
                <div className="alert alert-success" role="alert" style= {{display: "none"}}><span>You successfully read this important alert message.</span></div>
                <div className="alert alert-danger" role="alert" style= {{display: "none", position: "relative"}}><span>Change a few things up and try submitting again.</span></div>
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
                                      <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Language Code</th>
                                        <th>Version</th>
                                        <th>Action</th>
                                    </tr>
                                      </thead>
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
  )
}



module.exports = SettingsModal
