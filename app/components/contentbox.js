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
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;

class Contentbox extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {example:Constant.defaultReferences };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  
	render (){
        var simpleselect = this;
            // console.log(this.state.example);
		return (
		<div className="container-fluid">
            <div className="row row-col-fixed rmvflex" style={{display: 'flex'}}>
                <div className="col-sm-6 col-fixed" id="section-0">
                    <div className="row">
                        <div className="col-12 center-align">
                            <div className="btn-group">

        
         <div>
                    <SimpleSelect 
                    placeholder = "Select Language"
                    options = {
                        this.state.example.map(function(mile) {
                            return { label: mile, value: mile };
                        })
                    }
                    value = { this.state.mile } 
                    onValueChange = { function(mile) {
                        simpleselect.setState ({mile: mile, model: mile}
                        )
                    }} 
                    />
                </div>
	                            {/*<select className="ref-drop-down" title="Select Reference Text"></select>
	                                <input type="hidden" className="current-val" />
	                                <input type="hidden" className="current-pos" value="0" />
	                                <span className="diff-count"></span>*/}
                             </div>
                        </div>
                    </div>
                    <div className="row">
                        <div type="ref" className="col-12 col-ref"></div>
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