import React from 'react';
import ReactDOM from 'react-dom';
const bootstrap = require('react-bootstrap');
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const Col = require('react-bootstrap/lib/Col');
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const Constant = require("../util/constants");
const refDb = require(`${__dirname}/../util/data-provider`).referenceDb();
const session =  require('electron').remote.session;
import { dialog } from 'electron';
import { remote } from 'electron';
import { observer } from "mobx-react"
import TodoStore from "./TodoStore"
@observer
class ReferencePanel extends React.Component {

    render (){
        var verseGroup = [];
        for (var i = 0; i < TodoStore.chunkGroup.length; i++) {
            var vid="v"+(i+1);  
            verseGroup.push(<div key={i}><span className='verse-num' key={i}  onChange = {this.props.highlightRef(vid)}>{i+1}</span><span contentEditable={true} id={"v"+(i+1)} data-chunk-group={TodoStore.chunkGroup[i]}>{TodoStore.translationContent[i]}</span></div>);
        }
    return (  
        <div className="col-editor container-fluid">
            <div className="row">
                <div className="col-12 center-align">
                    <p className="translation">Translation</p>
                </div>
            </div>
            <div className="row">
            <div id="input-verses" className="col-12 col-ref">{verseGroup}</div>
            </div>
        </div>
        ) 
    }
}


module.exports = ReferencePanel