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
import  Footer  from '../components/footer';
import  ReferencePanel  from '../components/reference_panel';

@observer
class TranslationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleRefChange = this.handleRefChange.bind(this);
        this.saveTarget = this.saveTarget.bind(this);
        this.state = { refList: [], verses: [], content: '',defaultRef: 'eng_ulb' }
        
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
        });

        session.defaultSession.cookies.get({ url: 'http://refs.autographa.com' }, (error, refCookie) => {
            if(refCookie.length > 0){
                TodoStore.refId = refCookie[0].value;
            }
        });
        session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, bookCookie) => {
            if(bookCookie.length > 0){
                TodoStore.bookId = bookCookie[0].value;
            }
        });
        session.defaultSession.cookies.get({ url: 'http://chapter.autographa.com' }, (error, chapterCookie) => {
            if(chapterCookie.length > 0){
                TodoStore.chapterId = chapterCookie[0].value;
            }
        });
    }

    getRefContents(id, chapter) {
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
             TodoStore.content = content;
        });
    }

    handleRefChange(event) {
        event.persist()
        session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, bookCookie) => {
            if(bookCookie.length > 0){
                console.log(event.target.value+'_'+bookCodeList[parseInt(bookCookie[0].value, 10) - 1]);
                this.getRefContents(event.target.value+'_'+bookCodeList[parseInt(bookCookie[0].value, 10) - 1],TodoStore.chapterId)
            }else{
                this.getRefContents(event.target.value+'_'+bookCodeList[parseInt('1', 10) - 1],TodoStore.chapterId)
            }    
        })
        TodoStore.refId = event.target.value;
        this.setState({defaultRef: event.target.value})
        var cookieRef = { url: 'http://refs.autographa.com', name: '0' , value: event.target.value };
        session.defaultSession.cookies.set(cookieRef, (error) => {
            if (error)
                console.log(error);
        });
    }

    saveTarget() {
        var bookNo = TodoStore.bookId.toString();
        db.get(bookNo).then(function(doc) {
            refDb.get('refChunks').then(function(chunkDoc) {
                console.log(TodoStore.bookId);
                // createRefSelections();
                //console.log(TodoStore.bookId.chapters[parseInt(1, 10) - 1].verses);
                var verses = doc.chapters[parseInt(TodoStore.chapterId, 10) - 1].verses;
                console.log(verses);
                verses.forEach(function(verse, index) {
                    var vId = 'v' + (index + 1);
                    console.log(vId);
                    verse.verse = document.getElementById(vId).textContent;
                    doc.chapters[parseInt(TodoStore.chapterId, 10) - 1].verses = verses;
                    db.get(doc._id).then(function(book) {
                        doc._rev = book._rev;
                        db.put(doc).then(function(response) {
                            var dateTime = new Date();
                            $("#saved-time").html("Changes last saved on " + formatDate(dateTime));
                            setAutoSaveTime(formatDate(dateTime));
                            clearInterval(intervalId);
                        }).catch(function(err) {
                            db.put(doc).then(function(response) {
                                var dateTime = new Date();
                                $("#saved-time").html("Changes last saved on " + formatDate(dateTime));
                                setAutoSaveTime(formatDate(dateTime));
                            }).catch(function(err) {
                                clearInterval(intervalId);
                            });
                            clearInterval(intervalId);
                        });
                    });
                });
            });
        }).catch(function(err) {
            console.log('Error: While retrieving document. ' + err);
        });
    }
    
	render (){
        var translationContent = TodoStore.translationContent   ;
        console.log(translationContent);
        var verseGroup = [];
        for (var i = 0; i < TodoStore.chunkGroup.length; i++) {
                // console.log(i)
                verseGroup.push(<div key={i}><span className='verse-num' key={i}>{i+1}</span><span contentEditable={true} id={"v"+(i+1)} data-chunk-group={TodoStore.chunkGroup[i]}>{TodoStore.translationContent[i]}</span></div>);
            // console.log(chunkGroup)
        }
        const refContent = TodoStore.content 
		return (
		<div className="container-fluid">
            <div className="row row-col-fixed rmvflex" style={{display: 'flex'}}>
                <div className="col-sm-6 col-fixed" id="section-0">
                    <div className="row">
                        <div className="col-12 center-align">
                            <div className="btn-group">

                                    <select className="ref-drop-down" title="Select Reference Text" onChange={this.handleRefChange} value ={TodoStore.refId}>
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
                        <div type="ref" className="col-12 col-ref">
                           <div dangerouslySetInnerHTML={{__html: refContent}}></div>
                        </div>
                    </div>
                </div>
                <ReferencePanel />
            </div>
            <Footer onSave={this.saveTarget}/>
        </div>

		) 

	}
}

module.exports = TranslationPanel