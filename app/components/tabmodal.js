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
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const Col = require('react-bootstrap/lib/Col');

var TabModal = function(props) {
const close =() => props.actions.closeModal()
console.log(props.content);
  return (
 <Modal show={props.show} onHide={close} >
            <Modal.Header closeButton>
                <Modal.Title>Book and Chapter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <TabGroup content={props.content}/>
            </Modal.Body>
            <Modal.Footer>
        <Button onClick={() => props.actions.closeModal()}>Close</Button>
      </Modal.Footer>
        </Modal>
  )
}

var TabGroup = function(props){
return(
<Tabs animation={false} id="tab">
	        <div className="wrap-center">
				<div className="btn-group" role="group" aria-label="...">
                    <button className="btn btn-primary" type="button" id="allBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="All">ALL</button>
                    <button className="btn btn-primary" type="button" id="otBooksBtn" data-toggle="tooltip" data-placement="bottom" title=""  data-original-title="Old Testament">OT</button>
                    <button className="btn btn-primary" type="button" id="ntBooksBtn" data-toggle="tooltip" data-placement="bottom" title=""  data-original-title="New Testament">NT</button>
	            </div>	        
	        </div>
		    <Tab eventKey={1} title="Book">
			    <div className="wrap-center"></div>
	            <div className="row books-li" id="bookdata">
	                <ul id="books-pane">
	                	{
	                    	props.content.map((item,index) =>{
								return <li key={index}><a href="#" key={index} value={item} >{item}
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
            	
            		</ul>
            	</div>
            </Tab>
  		</Tabs>
  		)
}



module.exports = TabModal
