import React from 'react';
import ReactDOM from 'react-dom';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { observer } from "mobx-react"
import TodoStore from "./TodoStore";

@observer
class Footer extends React.Component {
    constructor(props){
        super(props);
        this.fontChange = this.fontChange.bind(this);
        this.state = {
            onSave: props.onSave
        }       
    }

    fontChange(multiplier) {
        let fontSize = TodoStore.fontMin;
        if (document.getElementsByClassName("col-ref")[0].style.fontSize == "") {
            document.getElementsByClassName("col-ref")[0].style.fontSize = "14px";
        }else{
            fontSize = parseInt(document.getElementsByClassName("col-ref")[0].style.fontSize)
        }
        if(multiplier < 0){
            if((multiplier+fontSize) <= TodoStore.fontMin ){
                fontSize = TodoStore.fontMin
            }else{
                fontSize = multiplier + fontSize
            }
        }else{
            if((multiplier+fontSize) >= TodoStore.fontMax ){
                fontSize = TodoStore.fontMax
            }else{
                fontSize = multiplier + fontSize
            }
        }
        TodoStore.currentFontValue = fontSize
        document.getElementsByClassName("col-ref")[0].style.fontSize = fontSize + "px";
    }
    sliderFontChange(obj){
        document.getElementsByClassName("col-ref")[0].style.fontSize = obj.target.value + "px";
    }

	render() {
		return (
		<nav className="navbar navbar-default navbar-fixed-bottom">
            <div className="container-fluid">
                 <div className="collapse navbar-collapse">
                        <div style={{float:"left"}} className="btn-group navbar-btn verse-diff-on" role="group" aria-label="...">
                            <span>
                                <a className="btn btn-default font-button minus" data-toggle="tooltip" data-placement="top" title="Decrease font size" onClick= {this.fontChange.bind(this, (-2))}>A-</a>
                            </span>
                                <ReactBootstrapSlider change={this.sliderFontChange.bind(this)} value={TodoStore.currentFontValue}   step={TodoStore.fontStep} max={TodoStore.fontMax} min={TodoStore.fontMin} orientation="horizontal"/>
                            <span>
                                <a className="btn btn-default font-button plus" data-toggle="tooltip" data-placement="top" title="Increase font size" onClick= {this.fontChange.bind(this, (+2))}>A+</a>
                            </span>
                        </div>
                    <div className="nav navbar-nav navbar-center verse-diff-on">
                        <div className="btn-group navbar-btn layout" role="group" aria-label="...">
                            <a className="btn btn-primary btn-default" href="#" data-output="2x" role="multi-window-btn" data-toggle="tooltip" data-placement="top" title="2-column layout">2x &nbsp;<i className="fa fa-columns fa-lg"></i></a>
                            <a className="btn btn-primary btn-default" href="#" data-output="3x" role="multi-window-btn" data-toggle="tooltip" data-placement="top" title="3-column layout">3x &nbsp;<i className="fa fa-columns fa-lg"></i>
                            </a>
                            <a className="btn btn-primary btn-default" href="#" data-output="4x" role="multi-window-btn" data-toggle="tooltip" data-placement="top" title="4-column layout">4x &nbsp;<i className="fa fa-columns fa-lg"></i></a>
                        </div>
                    </div>
                    <span id="saved-time"></span>
                        <ul style={{marginRight: "30px", float: "right"}} className="nav navbar-nav navbar-right">
                            
                          <li><a id="save-btn" data-toggle="tooltip" data-placement="top" title="Save changes" className="btn btn-success btn-save navbar-btn navbar-right" href="#" role="button" onClick={this.state.onSave}>Save</a></li>
                        </ul>
                </div>
            </div>
        </nav> )
	}
}

module.exports = Footer;