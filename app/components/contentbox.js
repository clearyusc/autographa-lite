import React from 'react';
import ReactDOM from 'react-dom';
const bootstrap = require('react-bootstrap');
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const Col = require('react-bootstrap/lib/Col');
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const Constant = require("../util/constants");
const BookList = require("./booklist");
const refDb = require(`${__dirname}/../util/data-provider`).referenceDb();
const session =  require('electron').remote.session;
import { dialog } from 'electron';
import { remote } from 'electron';
import TodoStore from "./TodoStore"



class Contentbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleRefChange = this.handleRefChange.bind(this);
        // this.getRefContents = this.getRefContents.bind(this);
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
                session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, bookCookie) => {
                if(bookCookie.length > 0){
                    TodoStore.bookId = bookCookie[0].value;
                    session.defaultSession.cookies.get({ url: 'http://chapter.autographa.com' }, (error, chapterCookie) => {
                      if(chapterCookie[0].value){
                        TodoStore.chapterId = chapterCookie[0].value;
                        this.getRefContents(TodoStore.refId+'_'+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1], TodoStore.chapterId.toString());
                      }else{
                        TodoStore.chapterId = '1';
                        this.getRefContents(TodoStore.refId+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1], TodoStore.chapterId.toString());

                      }
                    })
                }else{
                    TodoStore.bookId = '1';
                    TodoStore.chapterId = '1';
                    this.getRefContents("eng_ulb_"+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1], TodoStore.chapterId.toString());

                }
            });  
            }else{
                TodoStore.bookId = '1';
                TodoStore.chapterId = '1';
                TodoStore.refId = 'eng_ulb_';
                this.getRefContents(TodoStore.refId+Constant.bookCodeList[parseInt(TodoStore.bookId, 10) - 1], TodoStore.chapterId.toString());
            }
        });
    }

    getRefContents(id, chapter) {
        console.log(id, chapter)
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
            TodoStore.bookChapterContent = content;
            this.setState({change: "test"})
        });
    }

/*    componentWillReceiveProps(nextProps) {
      this.setState({ content: nextProps.content });  
    }*/
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

	render (){
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
                           <div dangerouslySetInnerHTML={{__html: TodoStore.bookChapterContent}} />
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