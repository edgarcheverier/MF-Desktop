import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CarSubmitted.css'
class CarSubmitted extends Component {
  
  render(){
    return (
      <div className="container">
        <h5>Your Car Is Published Now</h5>
        <h5 className="thanks">Thank You!</h5>
        <Link  to="/">Back Home</Link>
      </div>
    )
  }
}

export default CarSubmitted;
