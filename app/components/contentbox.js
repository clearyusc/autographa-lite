import React from 'react';
import ReactDOM from 'react-dom';
 const bootstrap = require('react-bootstrap');
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
 const Constant = require("../util/constants");
 const BookList = require("./booklist");
 // const ReactSelectize = require("react-selectize");
 // const SimpleSelect = ReactSelectize.SimpleSelect;
 const refDb = require(`${__dirname}/../util/data-provider`).referenceDb();
// <<<<<<< HEAD
// const session = require('electron').remote.session;
// const { dialog } = require('electron').remote;
// =======
 const session =  require('electron').remote.session;
 import { dialog } from 'electron';
 import { remote } from 'electron';


class Contentbox extends React.Component 
{
    constructor(props) {
        super(props);
        this.handleRefChange = this.handleRefChange.bind(this);
        this.getRefContents = this.getRefContents.bind(this);
        this.state = { refList: [], verses: [], content: '', book: props.selectedBook, selectedChapter:props.selectedChapter ,defaultRef: 'eng_ulb' }
        var existRef = [];
        var i
        var refLists = refDb.get('refs').then(function(doc) {
                doc.ref_ids.forEach(function(ref_doc) {
                    existRef.push( {value: ref_doc.ref_id, option: ref_doc.ref_name } );
            })
            return existRef;
        })

        refLists.then((refsArray) => {
            this.setState({refList:  refsArray});
        })

    session.defaultSession.cookies.get({ url: 'http://refs.autographa.com' }, (error, cookie) => {
            if (cookie.length > 0) {    
                this.setState({defaultRef: cookie[0].value})
                console.log(cookie)
                this.getRefContents(cookie[0].value+'_'+bookCodeList[parseInt(this.state.book, 10) - 1]);
            }else {
                this.getRefContents(this.state.defaultRef+'_'+bookCodeList[parseInt(this.state.book, 10) - 1]);
            }
        });       
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
      this.setState({ content: nextProps.content });  
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
    }

    handleRefChange(event) {
        this.getRefContents(event.target.value+'_'+bookCodeList[parseInt(this.state.book, 10) - 1])
        this.setState({defaultRef: event.target.value})
        var cookieRef = { url: 'http://refs.autographa.com', name: '0' , value: event.target.value };
        session.defaultSession.cookies.set(cookieRef, (error) => {
            if (error)
                console.log(error);
        });
    }
  
	render (){
		return (
		<div className="container-fluid">
            <div className="row row-col-fixed rmvflex" style={{display: 'flex'}}>
                <div className="col-sm-6 col-fixed" id="section-0">
                    <div className="row">
                        <div className="col-12 center-align">
                            <div className="btn-group">

                                    <select className="ref-drop-down" title="Select Reference Text" onChange={this.handleRefChange} value ={this.state.defaultRef}>
                                        {
                                            this.state.refList.map(function(refDoc, index){
                                                return(
                                                 <option value={refDoc.value}  key={index} >{refDoc.option}</option>
                                                )
                                            })
                                        }
                                    </select>
	                                <input type="hidden" className="current-val" />
	                                <input type="hidden" className="current-pos" value="0" />
	                                <span className="diff-count"></span>
                             </div>
                        </div>
                    </div>
                    <div className="row">
                        <div type="ref" className="col-12 col-ref" id="test">
                           <div dangerouslySetInnerHTML={{__html: this.state.content}} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-fixed col-editor">
                    <div className="row">
                        <div className="col-12 center-align">
                            <p className="translation">Translation</p>
                        </div>
                    </div>
                    <div className="row">
                    <div id="input-verses" className="col-12 col-ref">
                        </div>

                    </div>
                </div>
            </div>
        </div>
		) 

	}
}

module.exports = Contentbox