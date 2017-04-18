 const React = require('react')
 const ReactDOM = require('react-dom')
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

class Contentbox extends React.Component 
{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = { refList: [], verses: [] }
    var existRef = []
    var i
    var refLists = refDb.get('refs').then(function(doc) {
            doc.ref_ids.forEach(function(ref_doc) {
                existRef.push( {value: ref_doc.ref_id, option: ref_doc.ref_name } )
                console.log(ref_doc);
        })
        return existRef
    })

    refLists.then((refsArray) => {
    this.setState({refList:  refsArray})
    })
 /*   getReferenceText(function(err, refContent) {
        if (err) {
            console.log(err);
            alertModal("Error", "This chapter is not available in the selected reference version.");
            return;
        } else {

        }*/
        var verse = {};
        var abc = refDb.get('eng_udb_GEN').then(function(doc) {
        verse = doc;
        return verse
    })
        abc.then((item) => {
        this.setState({verses:  item})
    })
}



  handleChange(event) {
    this.setState({value: event.target.value});
  }

  
	render (){
        console.log(this.state.verses.chapters)
        // var simpleselect = this;
            // console.log(this.state.example);
		return (
		<div className="container-fluid">
            <div className="row row-col-fixed rmvflex" style={{display: 'flex'}}>
                <div className="col-sm-6 col-fixed" id="section-0">
                    <div className="row">
                        <div className="col-12 center-align">
                            <div className="btn-group">

                                    <select className="ref-drop-down" title="Select Reference Text">
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