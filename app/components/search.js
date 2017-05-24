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
const Radio = require('react-bootstrap/lib/Radio')
const FormGroup = require('react-bootstrap/lib/FormGroup')
import TextField from 'material-ui/TextField';
// const Nav = require('react-bootstrap/lib/Nav');
// const NavItem = require('react-bootstrap/lib/NavItem');
// import TextField from 'material-ui/TextField';
// import RadioButton from 'material-ui/RadioButton';
import TodoStore from "./TodoStore"

// constructor(props) {
//     super(props);

//     this.state = {
//       open: false,
//       anchorOrigin: {
//         horizontal: 'left',
//         vertical: 'bottom',
//       },
//       targetOrigin: {
//         horizontal: 'left',
//         vertical: 'top',
//       },
//     };
//   }

var SearchModal = function(props) {
    let closeSearch = () => TodoStore.showModalSearch = false
  return (  
    <Modal show={props.show} onHide={closeSearch} id="tab-search">
        <Modal.Header closeButton>
            <Modal.Title>Search and Replace</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <FormGroup>
      <Radio name="radioGroup" inline>
        Current Chapter
      </Radio>
      {' '}
      <Radio name="radioGroup" inline>
        Current Book
      </Radio>
      {' '}
    </FormGroup>

          <div>
            <label>Find</label><br />
            <TextField hintText="Search Text" /> <br />
            <label>Replace With</label><br />
            <TextField hintText="Replacement" />
          </div>

          </Modal.Body>
    </Modal>
  )
}



module.exports = SearchModal
