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

      highlightRef(obj){
            var content = ReactDOM.findDOMNode(this);
            let verses = content.getElementsByClassName("verse-input")[0].querySelectorAll("span[id^=v]");
            let refContent = document.getElementsByClassName('ref-contents')[0].children[0];
            for (var i = 0; i < verses.length; i++) {
                let refDiv = refContent.querySelectorAll('div[data-verse^='+'"'+"r"+(i+1)+'"'+']');
                if (refDiv != 'undefined'){
                    refDiv[0].style="background-color:none;font-weight:none;padding-left:10px;padding-right:10px";
                }            
            };

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


    render (){
        var verseGroup = [];
        for (var i = 0; i < TodoStore.chunkGroup.length; i++) {
            var vid="v"+(i+1);  
            verseGroup.push(<div key={i} onClick = {this.highlightRef.bind(this, vid)} ><span className='verse-num' key={i}>{i+1}</span><span contentEditable={true} id={vid} data-chunk-group={TodoStore.chunkGroup[i]}>{TodoStore.translationContent[i]}</span></div>);
        }
    return (  
        <div className="col-editor">
            <div className="row">
                <div className="col-12 center-align">
                    <p className="translation">Translation</p>
                </div>
            </div>
            <div className="row">
            <div id="input-verses" className="col-12 col-ref verse-input">{verseGroup}</div>
            </div>
        </div>
        ) 
    }
}


module.exports = ReferencePanel