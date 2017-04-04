const React = require('react')
const ReactDOM = require('react-dom')



class Navbar extends React.Component {
render(){
    return(
  <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                    <a className="navbar-brand" href="javascript:;"><img alt="Brand" src="../assets/images/logo.png"/></a>
                </div>
                <div className="navbar-collapse collapse" id="navbar">
                    <ul className="nav navbar-nav" style={{padding: "3px 0 0 0px"}}>
                        <li>
                            <div className="btn-group navbar-btn strong verse-diff-on" role="group" aria-label="..." id="bookBtn" style={{marginLeft:"200px"}}>
                                <a href="#"  className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">Genesis
                                </a>
                                <span id="chapterBtnSpan">
                                <a className="btn btn-default" id="chapterBtn" data-target="#myModal" href="javascript:getBookChapterList('1');" data-toggle="modal" data-placement="bottom"  title="Select Chapter" >1</a>
                                </span>
                            </div>
                            
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right nav-pills verse-diff-on">
                        <li style={{padding: "17px 5px 0 0", color: "#fff", fontWeight: "bold"}}><span>OFF</span></li>
                        <li>
                            <label style={{marginTop:"17px"}} className="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-2" id="switchLable" data-toggle='tooltip' data-placement='bottom' title="Compare mode">
                                <input type="checkbox" id="switch-2" className="mdl-switch__input check-diff"/>
                                <span className="mdl-switch__label"></span>
                            </label>
                            
                        </li>
                        <li style={{padding:"17px 0 0 0", color: "#fff", fontWeight: "bold"}}><span>ON</span></li>
                        <li>
                            <a href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="Find and replace" id="searchText"><i className="fa fa-search fa-2x"></i></a>
                        </li>
                        <li>
                            <a href="#" data-toggle="tooltip" data-placement="bottom" title="Export as USFM" id="export-usfm"><i className="fa fa-cloud-download fa-2x"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-target="#aboutmodal" data-toggle="tooltip" data-placement="bottom" title="About" id="btnAbout"><i className="fa fa-info fa-2x"></i></a>
                        </li>
                        <li><a href="javascript:;" id="btnSettings" data-target="#bannerformmodal" data-toggle="tooltip" data-placement="bottom" title="Settings"><i className="fa fa-cog fa-2x"></i></a></li>
                    </ul>
                </div>
            </div>
        </nav>
        )
    }
}
module.exports = Navbar