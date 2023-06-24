// https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg
import React, { Component } from 'react'
import './common.css'


class Error extends Component {
  constructor() {
    super()
  }

  

  render() {
    return (
      <div style={{position: "relative", width: "100%", height: "90vh"}}>
        <img src="https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg" style={{width: "100%", height: "100%"}}/>
        <h1 style={{position: "absolute", top: "10%", left: "50%", transform: "translate(-50%, -50%)", color: "rgb(51, 97, 104)", textAlign: "center"}}>
        Kindly ensure that you logout and login properly.
        </h1>
      </div>
    );
  }
  
}

export default Error