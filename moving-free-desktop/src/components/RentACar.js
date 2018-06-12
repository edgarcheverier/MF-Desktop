import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import '../styles/RentACar.css';
import { Redirect } from 'react-router'
import { Button, Media, Input } from 'reactstrap';


class RentACar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: {},
      selectedCity: "Barcelona",
      selectedQuality: "Basic",
      Submit: false,
      welcomePage: false
    };
  }

  onDayPress = day => {
    this.setState({
      selectedDay: day,
      selected: day.dateString
    });
    console.log(this.state.selectedDay)
  } 

  updateCity = e => {
    this.setState({selectedCity: e.target.value})
    console.log(this.state.selectedCity)
  }

  updateQuality = e => {
    this.setState({selectedQuality: e.target.value})
    console.log(this.state.selectedQuality)
  }

  submitCar =  () => {
    let arr = [];
    arr.push(this.state.selectedCity, this.state.selectedQuality);
    this.props.searchCar(arr);
    this.setState({Submit: true})
  }

  goHome = () => {
    this.setState({welcomePage: true})
  }

  render(){
    if (this.state.welcomePage) return <Redirect to="/" />
    if (this.state.Submit) return <Redirect to="/cars" />
    return(
      <div>
        <div className="title">
          <h3>Rent A Car Component</h3>
        </div>

        <Calendar className="calendar" onChange={this.onDayPress} />

        <Input type="select" name="select" onChange={this.updateCity}>
          <option value="Barcelona">Barcelona</option>
          <option value="Helsinki">Helsinki</option>
          <option value="Miami">Miami</option>  
        </Input>

        <Input className="select" type="select" name="select" onChange={this.updateQuality}>
          <option value="Basic">Basic</option>
          <option value="All">All</option>
        </Input>
        
        <Button className="buttonSubmit" outline color="primary" onClick={this.submitCar}>Submit</Button>
        <Button className="buttonWelcome" outline color="primary" onClick={this.goHome}>Go Back</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cars: state.carReducer
});

const mapDispatchToProps = (dispatch) => ({
  searchCar: (car) => dispatch({
    type: 'SEARCH_CARS',
    data: car
  })
})

 export default connect(mapStateToProps, mapDispatchToProps)(RentACar)