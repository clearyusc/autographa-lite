import React from 'react';
import ReactDOM from 'react-dom';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import TodoStore from "./TodoStore";

class Footer extends React.Component {
    constructor(props){
        super(props);
        this.fontChange = this.fontChange.bind(this);
        this.state = {
            // step: 1,
            // max: 40,
            // min: 14,
            currentValue: 14,
            onSave: props.onSave
        }
       
        // console.log(mySlider)
    }

    fontChange(multiplier) {
         let fontSize = 14;
        if (document.getElementsByClassName("col-ref")[0].style.fontSize == "") {
            document.getElementsByClassName("col-ref")[0].style.fontSize = "14px";
        }else{
            fontSize = parseInt(document.getElementsByClassName("col-ref")[0].style.fontSize)
        }
        // console.log((multiplier+this.state.fontSize ))
        if(multiplier < 0){
            if((multiplier+fontSize) <= 14 ){
                fontSize = 14
            }else{
                fontSize = multiplier + fontSize
                // this.setState({fontSize: (multiplier+this.state.fontSize )})
            }
        }else{
            if((multiplier+fontSize) >= 40 ){
                fontSize = 40
            }else{
                fontSize = multiplier + fontSize
            }
        }
         this.setState({currentValue: fontSize})
        // TodoStore.currentValue = TodoStore.fontSize;
        document.getElementsByClassName("col-ref")[0].style.fontSize = fontSize + "px";
    }
    sliderFontChange(obj){
        // console.log(obj)
        document.getElementsByClassName("col-ref")[0].style.fontSize = obj.target.value + "px";
    }

	render() {
        // var currentValue = TodoStore.currentValue
        // console.log(currentValue)
		return (
		<nav className="navbar navbar-default navbar-fixed-bottom">
            <div className="container-fluid">
                 <div className="collapse navbar-collapse">
                        <div style={{float:"left"}} className="btn-group navbar-btn verse-diff-on" role="group" aria-label="...">
                            <span>
                                <a className="btn btn-default font-button minus" data-toggle="tooltip" data-placement="top" title="Decrease font size" onClick= {this.fontChange.bind(this, (-2))}>A-</a>
                            </span>
                                <ReactBootstrapSlider change={this.sliderFontChange.bind(this)} value={this.state.currentValue}   step={TodoStore.step} max={TodoStore.max} min={TodoStore.min} orientation="horizontal"/>
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
              ss  </div>
            </div>
        </nav> )
	}
}

module.exports = Footer;