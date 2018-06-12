import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import WelcomPage from './components/WelcomePage';
import RentYourCar from './components/RentYourCar';
import RentACar from './components/RentACar';
import Cars from './components/Cars';
import CarSubmitted from './components/CarSubmitted';


class App extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={WelcomPage}/>
          <Route path="/rentYourCar" component={RentYourCar}/>
          <Route path="/rentACar" component={RentACar}/>
          <Route path="/cars" component={Cars} />
          <Route path="/carSubmitted" component={CarSubmitted} />
        </div>
      </Router>
    );
  }
}

export default App;
