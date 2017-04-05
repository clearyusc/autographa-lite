const React = require('react');
const ReactDOM = require('react-dom');

class Footer extends React.Component 
{
	render() 
    {
		return (
		<nav className="navbar navbar-default navbar-fixed-bottom">
            <div className="container-fluid">
                 <div className="collapse navbar-collapse">
                        <div style={{float:"left"}} className="btn-group navbar-btn verse-diff-on" role="group" aria-label="...">
                            <span>
                                <a className="btn btn-default font-button minus" data-toggle="tooltip" data-placement="top" title="Decrease font size" href="JavaScript:void(0)">A-</a>
                            </span>
                                <input id="fontSlider" type="text" data-slider-min="14" data-slider-max="30" data-slider-step="1" data-slider-value="14"/>
                                <span id="fontSliderCurrentSliderValLabel"></span>
                            <span>
                                <a className="btn btn-default font-button plus" data-toggle="tooltip" data-placement="top" title="Increase font size" href="JavaScript:void(0);">A+</a>
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
                            
                          <li><a id="save-btn" data-toggle="tooltip" data-placement="top" title="Save changes" className="btn btn-success btn-save navbar-btn navbar-right" href="#" role="button">Save</a></li>
                        </ul>
                </div>
            </div>
        </nav> )
	}
}

module.exports = Footer;