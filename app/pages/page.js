import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from '../components/footer';
import { NavBar } from '../components/navbar';
import { Contentbox } from '../components/contentbox';

class Page extends React.Component {
  
render(){
    return (

     <div><NavBar /><Contentbox /><Footer /></div>   
    )
  } 
};


export default Page
