import React, { Component } from 'react';
import { Redirect } from 'react-router'
import '../styles/WelcomePage.css';
import { Button } from 'reactstrap';

 
class WelcomPage extends Component {  
  state = {
    renta: false,
    renty: false
  }


  handleRentA = () => {
    this.setState({renta: true})
  }
  handleRentYour = () => {
    this.setState({renty: true})
  }
  render(){
    if (this.state.renta) return <Redirect to="/rentACar" />
    if (this.state.renty) return <Redirect to="/rentYourCar" />
    return(
      <div className="mainContainer">
        <div className="titleContainer">
          <h1 className="title">Moving Free</h1>
        </div>
        <div className="rentAContainer">
          <Button outline color="info"  onClick={this.handleRentA}>Rent A Car</Button>
        </div>
        <div className="rentYourCar">
          <Button outline color="info"  onClick={this.handleRentYour}>Rent Your Car</Button>
        </div>
      </div>
    )
  }
}
export default WelcomPage;