// <<<<<<< HEAD
// const React = require('react')
// const ReactDOM = require('react-dom')
// const Footer = require('../components/footer.js')
// const NavBar = require('../components/navbar.js')
// const Contentbox = require('../components/contentbox')
// // const darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme')
// // const MuiThemeProvider = require ('material-ui/styles/MuiThemeProvider')
// // const getMuiTheme = require('material-ui/styles/getMuiTheme')
// =======
import React from 'react';
import  Footer  from '../components/footer';
import  NavBar  from '../components/navbar';
import Contentbox  from '../components/contentbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Page extends React.Component {
  
render(){
    return (
    <MuiThemeProvider>
     <div>
     	<NavBar />
     	<Footer />
     </div>   
     </ MuiThemeProvider>
    )
  } 
};

module.exports = Page

