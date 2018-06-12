import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getData from '../firebase/getData';
import { Redirect } from 'react-router';
import { Button, Media, Input } from 'reactstrap';
import '../styles/Cars.css';
const uuidv4 = require('uuid/v4');

class Cars extends Component {
  constructor(props){
    super(props);
    this.state = {
      filters: [], // ["city", "Basic or All"]
      data: [], // .carInfo -  .city - .contactInfo - .name  - .price - .url 
      goback: null
    }
  }

  componentDidMount = async () => {
    let filters = this.props.cars;
    let arr = [];
    let data = await getData();
    for (let i in data){
      arr.push(data[i].details)
    }
    await this.setState({data: arr, filters: filters}); 
    console.log(this.state.filters, this.state.data)
  }
// <img src={this.state.data[i].url}  key={uuidv4()}/>
  displayCarouse = () => {
    let arr = [];
    let quality;
    if (this.state.filters[1] == 'Basic') {
      quality = 30
    } else {
      quality = 150
    }
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.filters[0] == this.state.data[i].city && Number(this.state.data[i].price) < quality) {
        arr.push(
          <div key={uuidv4()}>
            <h4 key={uuidv4()}>{this.state.data[i].city}</h4>
            <Media className="image" key={uuidv4()} object src={this.state.data[i].url} />
            <p key={uuidv4()}>{this.state.data[i].carInfo}</p>
            <p key={uuidv4()}> Price Per Day: {this.state.data[i].price} €</p>
            <p key={uuidv4()}> Owner's Name: {this.state.data[i].name}</p>
            <p key={uuidv4()}> Contact: {this.state.data[i].contactInfo}</p>
          </div>   
        ) 
      }
    }
    return arr;
  }

  goBackButton = () => {
    this.setState({goback: true})
  }

  render(){
    if (this.state.goback) return <Redirect to="/rentACar" />
    if (this.state.data.length > 0) {
      return (
        <div>
          <div className="carsContainer">
            {this.displayCarouse()}
          </div>
          <Button className="button" color="primary" size="lg" block onClick={this.goBackButton}>Back to Search</Button>
        </div>
      )
    } else {
      return (
        <div>
          <h4>Loading....</h4>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  cars: state.carReducer
});

export default connect(mapStateToProps)(Cars)