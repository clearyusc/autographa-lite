const React = require('react')
const ReactDOM = require('react-dom')
const Footer = require('../components/footer')
const NavBar = require('../components/navbar')

class Page extends React.Component {
  
render(){
    return (

     <div><NavBar /><Footer /></div>   
    )
  } 
};


module.exports = Page
