const React = require('react')
const ReactDOM = require('react-dom')
const Footer = require('../components/footer.js')
const NavBar = require('../components/navbar.js')
const Contentbox = require('../components/contentbox')
// const darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme')
// const MuiThemeProvider = require ('material-ui/styles/MuiThemeProvider')
// const getMuiTheme = require('material-ui/styles/getMuiTheme')

class Page extends React.Component {
  
render(){
    return (

     <div><NavBar /><Contentbox /><Footer /></div>   
    )
  } 
};


 module.exports = Page
