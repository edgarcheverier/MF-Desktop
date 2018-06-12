import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarSubmitted extends Component {
  
  render(){
    return (
      <div>
        <h1>Your Car Is Published Now</h1>
        <h1>Thank You!</h1>
        <Link to="/">Back Home</Link>
      </div>
    )
  }
}

export default CarSubmitted;
