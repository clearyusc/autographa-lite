const React = require('react')
const ReactDOM = require('react-dom')

class Page extends React.Component {
  
render(){
    return (
        <div> HI REACTJS
         <div class="modal fade aboutmodal" tabindex="-1" role="dialog" aria-labelledby="aboutmodal" aria-hidden="true" id="aboutmodal">
            <div class="modal-dialog modal-sm" style="margin-right: 55%;">
                <div class="modal-content">
                    <button style="padding: 13px 22px;" type="button" class="close" data-dismiss="modal" data-toggle = "tooltip" data-placement="bottom" title = "Close">&times;</button>
                    <div class="modal-header" style="height:50px;">
                        <h4 class="modal-title" id="myModalLabel">About</h4>
                    </div>
                    <div class="modal-body" style="height: 370px;">
                        <div role="tabpanel" class="selected">
                            
                        <div class="container-fluid">
                                <div class="row">
                        <div class="col-sm-12">
                            <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                                <div class="mdl-tabs__tab-bar">
                                    <a href="#overview-tab" id="overviewtab" class="mdl-tabs__tab is-active">Overview</a>
                                    <a href="#license-tab" id="licensetab" class="mdl-tabs__tab">License</a>
                                </div>
                            <div class="mdl-tabs__panel is-active" id="overview-tab">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <img src="../assets/images/autographa_lite_large.png" class="img-circle" alt="Cinque Terre" width="215" height="200"/>
                                    </div>
                                    <div class="col-xs-6">
                                        <h3>Autographa Lite</h3>
                                        <p>Version 0.1</p>
                                        <p>Source code hosted at: https://github.com/Bridgeconn/bib-edit</p>
                                    </div>
                                </div>
                            </div>
                                <div class="mdl-tabs__panel" id="license-tab" style="height: 306px;overflow-y: scroll; overflow-x:scroll">
                                      <h4> The MIT License (MIT)</h4>
                                      <p>Released in 2017 by Friends of Agape (www.friendsofagape.org) in partnership with RUN Ministries (www.runministries.org). </p>
                                      <br/>
                                      <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
                                      <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                                      <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
                                     
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade bannerformmodal" tabindex="-1" role="dialog" aria-labelledby="bannerformmodal" aria-hidden="true" id="bannerformmodal">
            <div class="modal-dialog modal-sm" style="margin-right: 55%;">
                <div class="modal-content">
                    <button style="padding: 13px 22px;" type="button" class="close" data-dismiss="modal" data-toggle = "tooltip" data-placement="bottom" title = "Close">&times;</button>
                    <div class="modal-header" style="height:87px;">
                        <h4 class="modal-title" id="myModalLabel"> Settings </h4>
                        <div class="alert alert-success" role="alert" style="display:none;"><span>You successfully read this important alert message.</span></div>
                        <div class="alert alert-danger" role="alert" style="display:none;position: relative;"><span>Change a few things up and try submitting again.</span></div>
                    </div>
                    <div class="modal-body" style="height:475px">
                   
                        <div class="tabs" style="">
                             <a href="javascript:void(0)" class="tablinks" onclick="settings(event, 'language-settings')" id="defaultOpen">Translation Details</a>
                            <a href="javascript:void(0)" class="tablinks" onclick="settings(event, 'target-usfm')">Import Translation</a>
                            <a href="javascript:void(0)" class="tablinks" onclick="settings(event, 'usfm-settings')" >Import Reference Text</a>
                            <a href="javascript:void(0)" class="tablinks" onclick="settings(event, 'modify-reference')">Manage Reference Texts</a>
                        </div>
                        <div id="usfm-settings" class="tabcontent">
                            <div class="form-group">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input class="mdl-textfield__input" type="text" id="ref-name" placeholder="New English Translation"/>
                                    <label class="mdl-textfield__label" for="ref-name">Bible name</label>
                                </div>
                            </div>
                        <div class="form-group">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input class="mdl-textfield__input" type="text" id="ref-lang-code" placeholder="eng"/>
                                    <label class="mdl-textfield__label" for="ref-lang-code">Language Code</label>
                                </div>
                                <div id="reference-lang-result" class="lang-code"></div>
                                <input type="hidden" id="langCode" />
                            </div>
                            <div class="form-group">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input class="mdl-textfield__input" type="text" id="ref-version" placeholder="NET-S3"/>
                                    <label class="mdl-textfield__label" for="ref-version">Version</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input class="mdl-textfield__input import" type="text" id="ref-path" placeholder="Path of folder containing USFM files"/>
                                    <label class="mdl-textfield__label" for="ref-path">Folder Location</label>
                                </div>
                            </div>
                            <button style="float:right; margin-right: 33px;" class="btn btn-success" id="ref-import-btn">Import</button>
                        </div>
                        <div id="language-settings" class="tabcontent">
                            <div class="form-group">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input class="mdl-textfield__input" type="text" id="target-lang" placeholder="eng"/>
                                    <label class="mdl-textfield__label" for="target-lang">Language Code</label>
                                    <div id="target-lang-result" class="lang-code"></div>
                                    <input type="hidden" id="target-lang-code" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input class="mdl-textfield__input" type="text" id="target-version" placeholder="NET-S3"/>
                                    <label class="mdl-textfield__label" for="target-version">Version</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input class="mdl-textfield__input import" type="text" id="export-path" placeholder="Path to destination folder"/>
                                    <label class="mdl-textfield__label" for="export-path">Export Folder Location</label>
                                </div>
                            </div>
                            <button style="float:right; margin-right: 33px;" class="btn btn-success" id="save-settings">Save</button>
                        </div>
                        <div id="target-usfm" class="tabcontent">
                            <div class="form-group">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input class="mdl-textfield__input import" type="text" id="target-import-path" placeholder="Path of folder containing USFM files"/>
                                    <label class="mdl-textfield__label" for="target-import-path"> Folder Location</label>
                                </div>
                            </div>
                            <button style="float:right; margin-right: 33px;" id="target-import-btn" class="btn btn-success">Import</button>
                        </div>
                        <div id="modify-reference" class="tabcontent">
                            <div>
                                <table class="table table-bordered table-hover table-striped">
                                    <th>Name</th>
                                    <th>Language Code</th>
                                    <th>Version</th>
                                    <th>Action</th>
                                    <tbody id="reference-list">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
]        <div class="modal fade" tabindex="-1" role="dialog" id="dynamicModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-toggle = "tooltip" data-placement="bottom" title = "Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="heading"></h4>
                    </div>
                    <div class="modal-body" id="content"></div>
                    <div class="modal-footer">
                        <span class="btn btn-primary" data-dismiss="modal">OK</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" id="importModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-toggle = "tooltip" data-placement="bottom" title = "Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Translation Data</h4>
                    </div>
                    <div class="modal-body">Successfully imported text</div>
                    <div class="modal-footer">
                        <span class="btn btn-primary" data-dismiss="modal">OK</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" id="confirmModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-toggle = "tooltip" data-placement="bottom" title = "Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="heading">Confirmation</h4>
                    </div>
                    <div class="modal-body" id="confirmMessage"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" id="confirmOk">Confirm</button>
                        <span class="btn btn-primary" id="btnDelete" data-dismiss="modal" id="confirmCancel">Cancel</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="bookChapTabModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" data-toggle = "tooltip" data-placement="bottom" title = "Close"><span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Book and Chapter</h4>
                    </div>
                    <div class="modal-body">
                        <div role="tabpanel" class="selected">
                        
                            <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                                <div class="mdl-tabs__tab-bar">
                                    <a href="#books-panel" id="booksTab" class="mdl-tabs__tab is-active">Books</a>
                                    <a href="#chapters-panel" id="chapterTab" class="mdl-tabs__tab">Chapters</a>
                                </div>
                                <div class="mdl-tabs__panel is-active" id="books-panel">
                                    <div class="wrap-center">
                                        <div class="btn-group" role="group" aria-label="...">
                                            <button class="btn btn-primary" type="button" id="allBooksBtn" data-toggle="tooltip" data-placement="bottom" title="All">ALL</button>
                                            <button class="btn btn-primary" type="button" id="otBooksBtn" data-toggle="tooltip" data-placement="bottom" title="Old Testament">OT</button>
                                            <button class="btn btn-primary" type="button" id="ntBooksBtn" data-toggle="tooltip" data-placement="bottom" title="New Testament">NT</button>
                                        </div>
                                    </div>
                                  
                                    <div class="row books-li" id="bookdata">
                                        <ul id="books-pane">
                                        </ul>
                                    </div>
                                </div>
                                <div class="mdl-tabs__panel" id="chapters-panel">
                                    <div class="chapter-no">
                                        <ul id="chaptersList">
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                    <a class="navbar-brand" href="javascript:;"><img alt="Brand" src="../assets/images/logo.png"/></a>
                </div>
                <div class="navbar-collapse collapse" id="navbar">
                    <ul class="nav navbar-nav" style="padding: 3px 0 0 0px;">
                        <li>
                            <div class="btn-group navbar-btn strong verse-diff-on" role="group" aria-label="..." id="bookBtn" style="margin-left:200px;">
                                <a href="#" onclick="getBookList()" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">
                                </a>
                                <span id="chapterBtnSpan"><a class="btn btn-default" id="chapterBtn" data-target="#myModal" href="javascript:getBookChapterList('1');" data-toggle="modal" data-placement="bottom"  title="Select Chapter" ></a></span>
                            </div>
                            
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right nav-pills verse-diff-on">
                        <li style="padding:17px 5px 0 0; color: #fff; font-weight: bold"><span>OFF</span></li>
                        <li>
                            <label style="margin-top:17px;" class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-2" id="switchLable" data-toggle='tooltip' data-placement='bottom' title="Compare mode">
          
                                <input type="checkbox" id="switch-2" class="mdl-switch__input check-diff"/>
                                <span class="mdl-switch__label"></span>
                            </label>
                            
                        </li>
                        <li style="padding:17px 0 0 0; color: #fff; font-weight: bold"><span>ON</span></li>
                        <li>
                            <a href="javascript:;" data-toggle="tooltip" data-placement="bottom" title="Find and replace" id="searchText"><i class="fa fa-search fa-2x"></i></a>
                        </li>
                        <li>
                            <a href="#" data-toggle="tooltip" data-placement="bottom" title="Export as USFM" id="export-usfm"><i class="fa fa-cloud-download fa-2x"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-target="#aboutmodal" data-toggle="tooltip" data-placement="bottom" title="About" id="btnAbout"><i class="fa fa-info fa-2x"></i></a>
                        </li>
                        <li><a href="javascript:;" id="btnSettings" data-target="#bannerformmodal" data-toggle="tooltip" data-placement="bottom" title="Settings"><i class="fa fa-cog fa-2x"></i></a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row row-col-fixed rmvflex" style="display: flex;">
                <div class="col-sm-6 col-fixed" id="section-0">
                    <div class="row">
                        <div class="col-12 center-align">
                            <div class="btn-group">
                                
                                <select class="ref-drop-down" title="Select Reference Text"></select>
                                <input type="hidden" class="current-val"/>
                                <input type="hidden" class="current-pos" value="0"/>
                                <span class="diff-count"></span>
                            
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div type="ref" class="col-12 col-ref"></div>
                    </div>
                </div>
                <div class="col-sm-6 col-fixed col-editor">
                    <div class="row">
                        <div class="col-12 center-align">
                            <p class="translation">Translation</p>
                        </div>
                    </div>
                    <div class="row">
                        
                        <div id="input-verses" class="col-12 col-ref">
                        </div>

                    </div>
                </div>
            </div>
        </div>
<nav class="navbar navbar-default navbar-fixed-bottom">
    <div class="container-fluid">
          <div style="float:left;" class="btn-group navbar-btn verse-diff-on" role="group" aria-label="...">
                    <span>
                        <a class="btn btn-default font-button minus" data-toggle="tooltip" data-placement="top" title="Decrease font size" href="JavaScript:void(0)">A-</a>
                    </span>
                        <input id="fontSlider" type="text" data-slider-min="14" data-slider-max="30" data-slider-step="1" data-slider-value="14"/>
                        <span id="fontSliderCurrentSliderValLabel"></span>
                    <span>
                        <a class="btn btn-default font-button plus" data-toggle="tooltip" data-placement="top" title="Increase font size" href="JavaScript:void(0);">A+</a>
                    </span>
                </div>
            <div class="nav navbar-nav navbar-center verse-diff-on">
                <div class="btn-group navbar-btn layout" role="group" aria-label="...">
                    <a class="btn btn-primary btn-default" href="#" data-output="2x" role="multi-window-btn" data-toggle="tooltip" data-placement="top" title="2-column layout">2x &nbsp;<i class="fa fa-columns fa-lg"></i></a>
                    <a class="btn btn-primary btn-default" href="#" data-output="3x" role="multi-window-btn" data-toggle="tooltip" data-placement="top" title="3-column layout">3x &nbsp;<i class="fa fa-columns fa-lg"></i>
                    </a>
                    <a class="btn btn-primary btn-default" href="#" data-output="4x" role="multi-window-btn" data-toggle="tooltip" data-placement="top" title="4-column layout">4x &nbsp;<i class="fa fa-columns fa-lg"></i></a>
                </div>
            </div>
            <span id="saved-time"></span>
                <ul style="margin-right:30px; float: right;" class="nav navbar-nav navbar-right">
                    
                  <li><a id="save-btn" data-toggle="tooltip" data-placement="top" title="Save changes" class="btn btn-success btn-save navbar-btn navbar-right" href="#" role="button">Save</a></li>
                </ul>
    </div>
</nav>
        <div class="modal fade" id="books" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-toggle = "tooltip" data-placement="bottom" title = "Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Books</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="wrap-center">
                                    <div class="btn-group" role="group" aria-label="...">
                                        <button class="btn btn-default" type="button" id="allBooksBtn">ALL</button>
                                        <button class="btn btn-default" type="button" id="otBooksBtn">OT</button>
                                        <button class="btn btn-default" type="button" id="ntBooksBtn">NT</button>
                                    </div>
                                    <ul class="books" id="books-pane">
                                    </ul>
                                </div>
                                <ul class="books" id="books-pane">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="chapters" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-toggle = "tooltip" data-placement="bottom" title = "Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Chapters</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <ul class="chapter-picker" id="chaptersList">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="login" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-toggle = "tooltip" data-placement="bottom" title = "Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Login</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Enter the API Key to start using Autographer</label>
                            <input class="form-control" id="api-code" placeholder="API KEY"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="exportChoice">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-toggle = "tooltip" data-placement="bottom" title = "Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="heading">Export as USFM</h4>
                    </div>
                    <div class="modal-body" id="content">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="input-group">
                                    <input type="text" class="form-control" aria-label="..." id="stageText" placeholder="Stage name of translation"/>
                                    <div class="input-group-btn">
                                        <button id="dropdownBtn" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choose Stage <span class="caret"></span></button>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a href="#" data-value="stage1">Stage 1</a></li>
                                            <li><a href="#" data-value="stage2">Stage 2</a></li>
                                            <li><a href="#" data-value="stage3">Stage 3</a></li>
                                            <li><a href="#" data-value="stage4">Stage 4</a></li>
                                            <li><a href="#" data-value="stage4">Stage 5</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" id="exportUsfm" disabled="disabled">Export</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" id="searchTextModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" data-toggle = "tooltip" data-placement="bottom" title = "Close" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">Find and Replace</h4>
                    </div>
                    <div class="modal-body" id="content">
                        <div class="row">
                            <div class="col-lg-6">
                              
                                <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1">
                                    <input type="radio" id="option-1" class="mdl-radio__button form-check-input" name="searchOption" value="current" checked/>
                                    <span class="mdl-radio__label">Current chapter</span>
                                </label>
                           
                                <label style="margin-left: 10px;" class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-2">
                                    <input type="radio" id="option-2" class="mdl-radio__button" name="searchOption" value="all"/>
                                    <span class="mdl-radio__label">Current book</span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                             
                                <form action="#">
                                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="text" id="searchTextBox" placeholder="Search text"/>
                                        <span class="error help-inline" id="findError"></span>
                                        <label class="mdl-textfield__label" for="searchTextBox">Find</label>
                                    </div>
                                </form>
                         
                                <form action="#">
                                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="text" id="replaceTextBox" placeholder="Replacement"/>
                                        <span class="error help-inline" id="replaceError"></span>
                                        <label class="mdl-textfield__label" for="replaceTextBox">Replace with</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" id="btnfindReplace" data-toggle="tooltip" data-placement="bottom" title="Run find and replace">Replace</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" id="replaced-text-change">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal" data-toggle = "tooltip" data-placement="bottom" title = "Close" type="button"  aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="heading">Information!!</h4>
                    </div>
                    <div class="modal-body" id="content">
                        <div class="row">
                            <div class="col-lg-6" id="replace-message">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" id="btn-replace">
                        <input type="hidden" id="chapter-option" />
                        <button class="btn btn-primary" onclick="saveReplacedText();">Save Changes</button>
                        <button class="btn btn-primary" data-dismiss="modal" id="replace-cancel">Cancel</button>
                    </div>
                </div>
            </div>
        </div></div>
    )
  } 
};


module.exports = Page
