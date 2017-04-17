const React = require('react')
const ReactDOM = require('react-dom')
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

class Navbar extends React.Component 
{
     constructor(props) {
        super(props);
        this.state = { 
            showModal: false,
            showModalSettings:false,
            showModalBooks:false,
            data: booksList
        };      
        
    } 

  close() {
    this.setState({ 
        showModal: false,
        showModalSettings:false,
        showModalBooks:false 
    });
  }

  open() {
    this.setState({ 
        showModal: true 
    });
  } 

  openpopup() {
    this.setState({ 
        showModalSettings: true 
    });
  }

  openpopupBooks() {
    this.setState({ 
        showModalBooks:true 
    });
  }

  componentDidMount() {
      console.log('Component DID MOUNT!')

   }


    render() 
    {
    //        const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    // const tooltip = (
    //   <Tooltip id="modal-tooltip">
    //     wow.
    //   </Tooltip>
    // );
     let close = () => this.setState({showModal:false,
                                      showModalSettings:false,
                                      showModalBooks:false
                                  });
        return(
    <div>
        <Modal show={this.state.showModalBooks} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Book and Chapter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <Tabs defaultActiveKey={8} animation={false} id="noanim-tab-example">
            <Tab eventKey={8} title="Books">
            <div className="wrap-center">
                                        <div className="btn-group" role="group" aria-label="...">
                                            <button className="btn btn-primary" type="button" id="allBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="All">ALL</button>
                                            <button className="btn btn-primary" type="button" id="otBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Old Testament">OT</button>
                                            <button className="btn btn-primary" type="button" id="ntBooksBtn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="New Testament">NT</button>
                                        </div>
            </div>
                                <div className="row books-li" id="bookdata">
                                    <ul id="books-pane">
                                        {/*<li><a id="b1" href="javascript:setBookName('b1')" class="link-active">Genesis</a></li>
                                        <li><a id="b2" href="javascript:setBookName('b2')">Exodus</a></li>
                                        <li><a id="b3" href="javascript:setBookName('b3')">Leviticus</a></li>
                                        <li><a id="b4" href="javascript:setBookName('b4')">Numbers</a></li>
                                        <li><a id="b5" href="javascript:setBookName('b5')">Deuteronomy</a></li>
                                        <li><a id="b6" href="javascript:setBookName('b6')">Joshua</a></li>
                                        <li><a id="b7" href="javascript:setBookName('b7')">Judges</a></li>
                                        <li><a id="b8" href="javascript:setBookName('b8')">Ruth</a></li>
                                        <li><a id="b9" href="javascript:setBookName('b9')">1 Samuel</a></li>
                                        <li><a id="b10" href="javascript:setBookName('b10')">2 Samuel</a></li>
                                        <li><a id="b11" href="javascript:setBookName('b11')">1 Kings</a></li>
                                        <li><a id="b12" href="javascript:setBookName('b12')">2 Kings</a></li>
                                        <li><a id="b13" href="javascript:setBookName('b13')">1 Chronicles</a></li>
                                        <li><a id="b14" href="javascript:setBookName('b14')">2 Chronicles</a></li>
                                        <li><a id="b15" href="javascript:setBookName('b15')">Ezra</a></li>
                                        <li><a id="b16" href="javascript:setBookName('b16')">Nehemiah</a></li>
                                        <li><a id="b17" href="javascript:setBookName('b17')">Esther</a></li>
                                        <li><a id="b18" href="javascript:setBookName('b18')">Job</a></li>
                                        <li><a id="b19" href="javascript:setBookName('b19')">Psalms</a></li>
                                        <li><a id="b20" href="javascript:setBookName('b20')">Proverbs</a></li>
                                        <li><a id="b21" href="javascript:setBookName('b21')">Ecclesiastes</a></li>
                                        <li><a id="b22" href="javascript:setBookName('b22')">Song of Solomon</a></li>
                                        <li><a id="b23" href="javascript:setBookName('b23')">Isaiah</a></li>
                                        <li><a id="b24" href="javascript:setBookName('b24')">Jeremiah</a></li>
                                        <li><a id="b25" href="javascript:setBookName('b25')">Lamentations</a></li>
                                        <li><a id="b26" href="javascript:setBookName('b26')">Ezekiel</a></li>
                                        <li><a id="b27" href="javascript:setBookName('b27')">Daniel</a></li>
                                        <li><a id="b28" href="javascript:setBookName('b28')">Hosea</a></li>
                                        <li><a id="b29" href="javascript:setBookName('b29')">Joel</a></li>
                                        <li><a id="b30" href="javascript:setBookName('b30')">Amos</a></li>
                                        <li><a id="b31" href="javascript:setBookName('b31')">Obadiah</a></li>
                                        <li><a id="b32" href="javascript:setBookName('b32')">Jonah</a></li>
                                        <li><a id="b33" href="javascript:setBookName('b33')">Micah</a></li>
                                        <li><a id="b34" href="javascript:setBookName('b34')">Nahum</a></li>
                                        <li><a id="b35" href="javascript:setBookName('b35')">Habakkuk</a></li>
                                        <li><a id="b36" href="javascript:setBookName('b36')">Zephaniah</a></li>
                                        <li><a id="b37" href="javascript:setBookName('b37')">Haggai</a></li>
                                        <li><a id="b38" href="javascript:setBookName('b38')">Zechariah</a></li>
                                        <li><a id="b39" href="javascript:setBookName('b39')">Malachi</a></li>
                                        <li><a id="b40" href="javascript:setBookName('b40')">Matthew</a></li>
                                        <li><a id="b41" href="javascript:setBookName('b41')">Mark</a></li>
                                        <li><a id="b42" href="javascript:setBookName('b42')">Luke</a></li>
                                        <li><a id="b43" href="javascript:setBookName('b43')">John</a></li>
                                        <li><a id="b44" href="javascript:setBookName('b44')">Acts</a></li>
                                        <li><a id="b45" href="javascript:setBookName('b45')">Romans</a></li>
                                        <li><a id="b46" href="javascript:setBookName('b46')">1 Corinthians</a></li>
                                        <li><a id="b47" href="javascript:setBookName('b47')">2 Corinthians</a></li>
                                        <li><a id="b48" href="javascript:setBookName('b48')">Galatians</a></li>
                                        <li><a id="b49" href="javascript:setBookName('b49')">Ephesians</a></li>
                                        <li><a id="b50" href="javascript:setBookName('b50')">Philippians</a></li>
                                        <li><a id="b51" href="javascript:setBookName('b51')">Colossians</a></li>
                                        <li><a id="b52" href="javascript:setBookName('b52')">1 Thessalonians</a></li>
                                        <li><a id="b53" href="javascript:setBookName('b53')">2 Thessalonians</a></li>
                                        <li><a id="b54" href="javascript:setBookName('b54')">1 Timothy</a></li>
                                        <li><a id="b55" href="javascript:setBookName('b55')">2 Timothy</a></li>
                                        <li><a id="b56" href="javascript:setBookName('b56')">Titus</a></li>
                                        <li><a id="b57" href="javascript:setBookName('b57')">Philemon</a></li>
                                        <li><a id="b58" href="javascript:setBookName('b58')">Hebrews</a></li>
                                        <li><a id="b59" href="javascript:setBookName('b59')">James</a></li>
                                        <li><a id="b60" href="javascript:setBookName('b60')">1 Peter</a></li>
                                        <li><a id="b61" href="javascript:setBookName('b61')">2 Peter</a></li>
                                        <li><a id="b62" href="javascript:setBookName('b62')">1 John</a></li>
                                        <li><a id="b63" href="javascript:setBookName('b63')">2 John</a></li>
                                        <li><a id="b64" href="javascript:setBookName('b64')">3 John</a></li>
                                        <li><a id="b65" href="javascript:setBookName('b65')">Jude</a></li>
                                        <li><a id="b66" href="javascript:setBookName('b66')">Revelation</a></li>
                                    </ul>*/}
                                        {this.state.data.map(function(result) {
                                           return <BookList result={result}/>;
                                        })}
                                    </ul>
                                </div>
                            <div className= "clearfix"></div>
            </Tab>
            <Tab eventKey={9} title="Chapters">
                <div className="chapter-no">
                    <ul id="chaptersList">
                        <li><a id="c1" href="javascript:setChapter('1')">1</a></li>
                        <li><a id="c2" href="javascript:setChapter('2')">2</a></li>
                        <li><a id="c3" href="javascript:setChapter('3')">3</a></li>
                        <li><a id="c4" href="javascript:setChapter('4')">4</a></li>
                        <li><a id="c5" href="javascript:setChapter('5')">5</a></li>
                        <li><a id="c6" href="javascript:setChapter('6')">6</a></li>
                        <li><a id="c7" href="javascript:setChapter('7')">7</a></li>
                        <li><a id="c8" href="javascript:setChapter('8')">8</a></li>
                        <li><a id="c9" href="javascript:setChapter('9')">9</a></li>
                        <li><a id="c10" href="javascript:setChapter('10')">10</a></li>
                        <li><a id="c11" href="javascript:setChapter('11')">11</a></li>
                        <li><a id="c12" href="javascript:setChapter('12')">12</a></li>
                        <li><a id="c13" href="javascript:setChapter('13')">13</a></li>
                        <li><a id="c14" href="javascript:setChapter('14')">14</a></li>
                        <li><a id="c15" href="javascript:setChapter('15')">15</a></li>
                        <li><a id="c16" href="javascript:setChapter('16')">16</a></li>
                        <li><a id="c17" href="javascript:setChapter('17')">17</a></li>
                        <li><a id="c18" href="javascript:setChapter('18')">18</a></li>
                        <li><a id="c19" href="javascript:setChapter('19')">19</a></li>
                        <li><a id="c20" href="javascript:setChapter('20')">20</a></li>
                        <li><a id="c21" href="javascript:setChapter('21')">21</a></li>
                        <li><a id="c22" href="javascript:setChapter('22')">22</a></li>
                        <li><a id="c23" href="javascript:setChapter('23')">23</a></li>
                        <li><a id="c24" href="javascript:setChapter('24')">24</a></li>
                        <li><a id="c25" href="javascript:setCha pter('25')">25</a></li>
                        <li><a id="c26" href="javascript:setChapter('26')">26</a></li>
                        <li><a id="c27" href="javascript:setChapter('27')">27</a></li>
                        <li><a id="c28" href="javascript:setChapter('28')">28</a></li>
                        <li><a id="c29" href="javascript:setChapter('29')">29</a></li>
                        <li><a id="c30" href="javascript:setChapter('30')">30</a></li>
                        <li><a id="c31" href="javascript:setChapter('31')">31</a></li>
                        <li><a id="c32" href="javascript:setChapter('32')">32</a></li>
                        <li><a id="c33" href="javascript:setChapter('33')">33</a></li>
                        <li><a id="c34" href="javascript:setChapter('34')">34</a></li>
                        <li><a id="c35" href="javascript:setChapter('35')">35</a></li>
                        <li><a id="c36" href="javascript:setChapter('36')">36</a></li>
                        <li><a id="c37" href="javascript:setChapter('37')">37</a></li>
                        <li><a id="c38" href="javascript:setChapter('38')">38</a></li>
                        <li><a id="c39" href="javascript:setChapter('39')">39</a></li>
                        <li><a id="c40" href="javascript:setChapter('40')">40</a></li>
                        <li><a id="c41" href="javascript:setChapter('41')">41</a></li>
                        <li><a id="c42" href="javascript:setChapter('42')">42</a></li>
                        <li><a id="c43" href="javascript:setChapter('43')">43</a></li>
                        <li><a id="c44" href="javascript:setChapter('44')">44</a></li>
                        <li><a id="c45" href="javascript:setChapter('45')">45</a></li>
                        <li><a id="c46" href="javascript:setChapter('46')">46</a></li>
                        <li><a id="c47" href="javascript:setChapter('47')">47</a></li>
                        <li><a id="c48" href="javascript:setChapter('48')">48</a></li>
                        <li><a id="c49" href="javascript:setChapter('49')">49</a></li>
                        <li><a id="c50" href="javascript:setChapter('50')">50</a></li>
                        <li><a id="c51" href="javascript:setChapter('51')">51</a></li>
                        <li><a id="c52" href="javascript:setChapter('52')">52</a></li>
                        <li><a id="c53" href="javascript:setChapter('53')">53</a></li>
                        <li><a id="c54" href="javascript:setChapter('54')">54</a></li>
                        <li><a id="c55" href="javascript:setChapter('55')">55</a></li>
                        <li><a id="c56" href="javascript:setChapter('56')">56</a></li>
                        <li><a id="c57" href="javascript:setChapter('57')">57</a></li>
                        <li><a id="c58" href="javascript:setChapter('58')">58</a></li>
                        <li><a id="c59" href="javascript:setChapter('59')">59</a></li>
                        <li><a id="c60" href="javascript:setChapter('60')">60</a></li>
                        <li><a id="c61" href="javascript:setChapter('61')">61</a></li>
                        <li><a id="c62" href="javascript:setChapter('62')">62</a></li>
                        <li><a id="c63" href="javascript:setChapter('63')">63</a></li>
                        <li><a id="c64" href="javascript:setChapter('64')">64</a></li>
                        <li><a id="c65" href="javascript:setChapter('65')">65</a></li>
                        <li><a id="c66" href="javascript:setChapter('66')">66</a></li>
                        <li><a id="c67" href="javascript:setChapter('67')">67</a></li>
                        <li><a id="c68" href="javascript:setChapter('68')">68</a></li>
                        <li><a id="c69" href="javascript:setChapter('69')">69</a></li>
                        <li><a id="c70" href="javascript:setChapter('70')">70</a></li>
                        <li><a id="c71" href="javascript:setChapter('71')">71</a></li>
                        <li><a id="c72" href="javascript:setChapter('72')">72</a></li>
                        <li><a id="c73" href="javascript:setChapter('73')">73</a></li>
                        <li><a id="c74" href="javascript:setChapter('74')">74</a></li>
                        <li><a id="c75" href="javascript:setChapter('75')">75</a></li>
                        <li><a id="c76" href="javascript:setChapter('76')">76</a></li>
                        <li><a id="c77" href="javascript:setChapter('77')">77</a></li>
                        <li><a id="c78" href="javascript:setChapter('78')">78</a></li>
                        <li><a id="c79" href="javascript:setChapter('79')">79</a></li>
                        <li><a id="c80" href="javascript:setChapter('80')">80</a></li>
                        <li><a id="c81" href="javascript:setChapter('81')">81</a></li>
                        <li><a id="c82" href="javascript:setChapter('82')">82</a></li>
                        <li><a id="c83" href="javascript:setChapter('83')">83</a></li>
                        <li><a id="c84" href="javascript:setChapter('84')">84</a></li>
                        <li><a id="c85" href="javascript:setChapter('85')">85</a></li>
                        <li><a id="c86" href="javascript:setChapter('86')">86</a></li>
                        <li><a id="c87" href="javascript:setChapter('87')">87</a></li>
                        <li><a id="c88" href="javascript:setChapter('88')">88</a></li>
                        <li><a id="c89" href="javascript:setChapter('89')">89</a></li>
                        <li><a id="c90" href="javascript:setChapter('90')">90</a></li>
                        <li><a id="c91" href="javascript:setChapter('91')">91</a></li>
                        <li><a id="c92" href="javascript:setChapter('92')">92</a></li>
                        <li><a id="c93" href="javascript:setChapter('93')">93</a></li>
                        <li><a id="c94" href="javascript:setChapter('94')">94</a></li>
                        <li><a id="c95" href="javascript:setChapter('95')">95</a></li>
                        <li><a id="c96" href="javascript:setChapter('96')">96</a></li>
                        <li><a id="c97" href="javascript:setChapter('97')">97</a></li>
                        <li><a id="c98" href="javascript:setChapter('98')">98</a></li>
                        <li><a id="c99" href="javascript:setChapter('99')">99</a></li>
                        <li><a id="c100" href="javascript:setChapter('100')">100</a></li>
                        <li><a id="c101" href="javascript:setChapter('101')">101</a></li>
                        <li><a id="c102" href="javascript:setChapter('102')">102</a></li>
                        <li><a id="c103" href="javascript:setChapter('103')">103</a></li>
                        <li><a id="c104" href="javascript:setChapter('104')">104</a></li>
                        <li><a id="c105" href="javascript:setChapter('105')">105</a></li>
                        <li><a id="c106" href="javascript:setChapter('106')">106</a></li>
                        <li><a id="c107" href="javascript:setChapter('107')">107</a></li>
                        <li><a id="c108" href="javascript:setChapter('108')">108</a></li>
                        <li><a id="c109" href="javascript:setChapter('109')">109</a></li>
                        <li><a id="c110" href="javascript:setChapter('110')">110</a></li>
                        <li><a id="c111" href="javascript:setChapter('111')">111</a></li>
                        <li><a id="c112" href="javascript:setChapter('112')">112</a></li>
                        <li><a id="c113" href="javascript:setChapter('113')">113</a></li>
                        <li><a id="c114" href="javascript:setChapter('114')">114</a></li>
                        <li><a id="c115" href="javascript:setChapter('115')">115</a></li>
                        <li><a id="c116" href="javascript:setChapter('116')">116</a></li>
                        <li><a id="c117" href="javascript:setChapter('117')">117</a></li>
                        <li><a id="c118" href="javascript:setChapter('118')">118</a></li>
                        <li><a id="c119" href="javascript:setChapter('119')">119</a></li>
                        <li><a id="c120" href="javascript:setChapter('120')">120</a></li>
                        <li><a id="c121" href="javascript:setChapter('121')">121</a></li>
                        <li><a id="c122" href="javascript:setChapter('122')">122</a></li>
                        <li><a id="c123" href="javascript:setChapter('123')">123</a></li>
                        <li><a id="c124" href="javascript:setChapter('124')">124</a></li>
                        <li><a id="c125" href="javascript:setChapter('125')">125</a></li>
                        <li><a id="c126" href="javascript:setChapter('126')">126</a></li>
                        <li><a id="c127" href="javascript:setChapter('127')">127</a></li>
                        <li><a id="c128" href="javascript:setChapter('128')">128</a></li>
                        <li><a id="c129" href="javascript:setChapter('129')">129</a></li>
                        <li><a id="c130" href="javascript:setChapter('130')">130</a></li>
                        <li><a id="c131" href="javascript:setChapter('131')">131</a></li>
                        <li><a id="c132" href="javascript:setChapter('132')">132</a></li>
                        <li><a id="c133" href="javascript:setChapter('133')">133</a></li>
                        <li><a id="c134" href="javascript:setChapter('134')">134</a></li>
                        <li><a id="c135" href="javascript:setChapter('135')">135</a></li>
                        <li><a id="c136" href="javascript:setChapter('136')">136</a></li>
                        <li><a id="c137" href="javascript:setChapter('137')">137</a></li>
                        <li><a id="c138" href="javascript:setChapter('138')">138</a></li>
                        <li><a id="c139" href="javascript:setChapter('139')">139</a></li>
                        <li><a id="c140" href="javascript:setChapter('140')">140</a></li>
                        <li><a id="c141" href="javascript:setChapter('141')">141</a></li>
                        <li><a id="c142" href="javascript:setChapter('142')">142</a></li>
                        <li><a id="c143" href="javascript:setChapter('143')">143</a></li>
                        <li><a id="c144" href="javascript:setChapter('144')">144</a></li>
                        <li><a id="c145" href="javascript:setChapter('145')">145</a></li>
                        <li><a id="c146" href="javascript:setChapter('146')">146</a></li>
                        <li><a id="c147" href="javascript:setChapter('147')">147</a></li>
                        <li><a id="c148" href="javascript:setChapter('148')">148</a></li>
                        <li><a id="c149" href="javascript:setChapter('149')">149</a></li>
                        <li><a id="c150" href="javascript:setChapter('150')">150</a></li>
                    </ul>
                </div>
            </Tab>
          </Tabs>
          </Modal.Body>
        </Modal>



       <Modal show={this.state.showModalSettings} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
                        <div class="alert alert-success" role="alert" style= {{display: "none"}}><span>You successfully read this important alert message.</span></div>
                        <div class="alert alert-danger" role="alert" style= {{display: "none", position: "relative"}}><span>Change a few things up and try submitting again.</span></div>
          </Modal.Header>
          <Modal.Body style={{height: "400px"}}>
           <Tabs defaultActiveKey={4} animation={false} id="noanim-tab-example">
            <Tab eventKey={4} title="Translation Details">
                                <div className="form-group">
                                   <label htmlFor="ref-lang-code">Language Code</label><br />
                                    <input type="text" id="ref-lang-code" placeholder="eng" />
                                </div>
                                 <div id="reference-lang-result" class="lang-code"></div>
                                <input type="hidden" id="langCode" />
                            
                               <div className="form-group">
                                    <label>Version</label><br />
                                    <input type="text" id="ref-version" placeholder="NET-S3" />  
                                </div>
                           <div className="form-group">
                                    <label htmlFor="ref-path">Path to Folder Location</label><br />
                                    <input type="text" id="ref-path" placeholder="Path of folder containing USFM files" />
                            </div>
                            <button style={{float: "right", marginRight: "33px"}} className="btn btn-success" id="ref-import-btn">Import</button>
                            <div className= "clearfix"></div>
            </Tab>
            <Tab eventKey={5} title="Import Translation">
                    <div class="form-group">
                        <label>Folder Location</label><br />
                        <input type="text" id="ref-path" placeholder="Path of folder containing USFM files" />
                    </div>
            </Tab>
            <Tab eventKey={6} title="Import Reference Text">
           <div className="form-group">
                                <div >
                                    <label class="mdl-textfield__label" htmlFor="ref-name">Bible name</label><br />
                                    <input  className="mdl-textfield__input" type="text" id="ref-name" placeholder="New English Translation" />
                                </div>
            </div>
            <div className="form-group">
                                <div >
                                   <label htmlFor="ref-lang-code">Language Code</label><br />
                                   <input type="text" id="ref-lang-code" placeholder="eng" />   
                                </div>
                                <div id="reference-lang-result" className="lang-code"></div>
                                <input type="hidden" id="langCode" />
            </div>
            <div className="form-group">
                                <div >
                                    <label  htmlFor="version">Version</label><br />
                                    <input type="text" id="ref-version" placeholder="NET-S3" />
                                </div>
            </div>
            <div className="form-group">
                                <div >
                                    <label htmlFor="ref-path">Folder Location</label><br />
                                    <input type="text" id="ref-path" placeholder="Path of folder containing USFM files" />
                                </div>
            </div>
                            <button style={{float: "right", marginRight: "33px"}} className="btn btn-success" id="ref-import-btn">Import</button>
                <div className= "clearfix"></div>
            </Tab>
            <Tab eventKey={7} title="Manage Reference Texts">
                            <div>
                                <table className="table table-bordered table-hover table-striped">
                                    <th>Name</th>
                                    <th>Language Code</th>
                                    <th>Version</th>
                                    <th>Action</th>
                                    <tbody id="reference-list">
                                    </tbody>
                                </table>
                            </div>
            </Tab>
          </Tabs>
          </Modal.Body>
        </Modal>




         <Modal show={this.state.showModal} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Tabs defaultActiveKey={2} animation={false} id="noanim-tab-example">
            <Tab eventKey={2} title="Overview">
                <div className="row">
                    <div className="col-xs-6">
                        <img src="../assets/images/autographa_lite_large.png" class="img-circle" alt="Cinque Terre" width="215" height="200" />
                    </div>
                    <div className="col-xs-6">
                        <h3>Autographa Lite</h3>
                        <p>Version 0.1</p>
                        <p>Source code hosted at: https://github.com/Bridgeconn/autographa-lite</p>
                    </div>
                </div>
            </Tab>
            <Tab style={{height: "306px", overflowY: "scroll", overflowX : "scroll"}} eventKey={3} title="License"><h4> The MIT License (MIT)</h4>
                <p>Released in 2017 by Friends of Agape (www.friendsofagape.org) in partnership with RUN Ministries (www.runministries.org). </p>
                <br />
                <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
                <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
            </Tab>
          </Tabs>
           
          </Modal.Body>
        </Modal>
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
                                    <a eventKey={10} onClick={() => this.openpopupBooks()} href="#" className="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Select Book"  id="book-chapter-btn">
                                    </a>
                                    <span id="chapterBtnSpan">
                                    <a className="btn btn-default" id="chapterBtn" data-target="#myModal" href="javascript:getBookChapterList('1');" data-toggle="modal" data-placement="bottom"  title="Select Chapter" ></a>
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
                                <a eventKey={0} onClick={() => {this.open(); this.getBookChapterList()}} href="#" data-target="#aboutmodal" data-toggle="tooltip" data-placement="bottom" title="About" id="btnAbout"><i className="fa fa-info fa-2x"></i></a>
                            </li>
                            <li><a eventKey={1} onClick={() => this.openpopup()} href="javascript:;" id="btnSettings" data-target="#bannerformmodal" data-toggle="tooltip" data-placement="bottom" title="Settings"><i className="fa fa-cog fa-2x"></i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        )
    }
}
module.exports = Navbar