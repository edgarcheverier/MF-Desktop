import React, { Component } from 'react';
import { Redirect } from 'react-router'
import '../styles/WelcomePage.css';
import { Button } from 'reactstrap';
import FacebookLogin from './FacebookLogin';

 
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


  onFacebookLogin = (loginStatus, resultObject) => {
    console.log('Result: ', resultObject,'Login status: ', loginStatus)
    if (loginStatus === true) {
      this.setState({
        username: resultObject.user.name
      });
    } else {
      alert('Facebook login error');
    }
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
          <Button outline color="info" size="lg" onClick={this.handleRentA}>Rent A Car</Button>
        </div>
        <div className="rentYourCar">
          <Button outline color="info" size="lg" onClick={this.handleRentYour}>Rent Your Car</Button>
        </div>
        <div className="facebookLoginButton">
          <FacebookLogin onLogin={this.onFacebookLogin}>
            <Button outline color="primary" size="lg">Login With Facebook</Button>
          </FacebookLogin>
        </div>
      </div>
    )
  }
}
export default WelcomPage;