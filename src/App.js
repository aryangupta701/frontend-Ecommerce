import './App.css';
import Header from './components/layout/Header/Header.js';
import {BrowserRouter as Router} from 'react-router-dom';
import webfont from 'webfontloader'
import React from 'react'
import Footer from './components/layout/Footer/Footer.js';
import './components/layout/Footer/Footer.css'

function App() {
  React.useEffect(()=>{
    webfont.load({
      google :{
        families : ['Roboto' , 'Droid Sans' , 'Chilanka']
      }
    })
  }, [])
  return( 
  <Router>
    <Header />
    <Footer />
   </Router> 
  ) ;
}

export default App;
