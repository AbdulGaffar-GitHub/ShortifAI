import React, { Component } from 'react'
import './About.css'
class About extends Component {
  constructor() {
    super()
  }


  render() {
    return (


      <div style={{textAlign:"center"}} className="container">

        <div className="about-section">
          <h1>About Us</h1>
          <p>This project was made as Major Project by Final year students of Muffakham Jah College Of Engineering And Technology</p>
          <p>This website basically fetches news from various news sources and provides user short summary using <strong>BERT Extractive text based summarization :)</strong></p>
        </div>

        
          <div className="row">


            <div className="column">
              <div className="card">
                <img src="" alt="Abdul Gaffar" style={{width:"100%",height:"200px"}}/>
                <div className="container">
                  <h3>Abdul Gaffar</h3>
                  <p className="title">web Developer</p>
                  
                  <p><button 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href='https://wa.me/+919121182295?text=hello,%20how%20may%20i%20help%20you';
                    }}
                  className="button">Contact</button></p>
                </div>
              </div>
            </div>
            
            <div className="column">
              <div className="card">
                <img src="" alt="Noaman Don" style={{width:"100%",height:"200px"}}/>
                <div className="container">
                  <h3>Mohammed noaman Ali</h3>
                  <p className="title">Aspiring Data Scientist</p>
                  
                  <p><button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href='https://wa.me/+917032100903?text=hello,%20how%20may%20i%20help%20you';
                    }}
                  className="button">Contact</button></p>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src="" alt="Zayn" style={{width:"100%",height:"200px"}}/>
                <div className="container">
                  <h3>Syed Zayn</h3>
                  <p className="title">web Developer</p>
                  
                  <p><button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href='https://wa.me/+918374450677?text=hello,%20how%20may%20i%20help%20you';
                    }}
                  className="button">Contact</button></p>
                </div>
              </div>
            </div>
         
          </div>
      </div>
    )
  }
}

export default About