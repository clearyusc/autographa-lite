const React = require('react')
const ReactDOM = require('react-dom')
const Footer = require('../components/footer')
const NavBar = require('../components/navbar')
const Contentbox = require('../components/contentbox')

class Page extends React.Component {
  
render(){
    return (

     <div><NavBar /><Contentbox /><Footer /></div>   
    )
  } 
};


module.exports = Page
