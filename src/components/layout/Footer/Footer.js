import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftfooter"> 
            <h4>Download Our App</h4>
            <p>Download for android and IOS here</p>
            <img src = {playStore} alt="playstore" />
            <img src = {appStore} alt="appstore" />
        </div>
        <div className="bottomfooter">
            <h1>ShopiGo.</h1>
            <p>We Never Break Your Trust</p>
            <p>CopyRights 2022 &copy; Aryan Gupta</p>
        </div>    
        <div className="rightfooter">
            <h4>Follow Us</h4>
            <a href="https://www.github.com/aryangupta701" target="_blank">Github</a>
            <a href="https://www.instagram.com/aryangupta_701" target="_blank">Instagram</a>
            <a href="https://www.linkedin.com/in/aryan-gupta-78273a1b6" target="_blank">Linkedin</a>
        </div>
    </footer>
  )
}

export default Footer