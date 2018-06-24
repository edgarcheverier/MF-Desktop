import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../styles/RentYourCar.css'
import Helpers from '../firebase/helper';
import TriggerImage from '../firebase/fetchImage';

import { Button, Media, Input, CustomInput } from 'reactstrap';

const uuidv4 = require('uuid/v4');
let uid = uuidv4();
 
class RentYourCar extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCity: "Barcelona",
      carInfo: "", 
      contactInfo: "", 
      Name: "", 
      PriceDay: "",
      pickerImageForShow: null,
      pickedImagedOne: null,
      file: '',
      welcomePage: false,
      SubmitYourCar: false
    }
  }

  handleSelect = event => {
    this.setState({selectedCity: event.target.value})
    console.log(this.state.selectedCity);
    console.log(this.state.Name);
  }

  handleInputs = event => {
    let name = event.target.name
    this.setState({[name]: event.target.value});
  }

  handleFile = async (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      let base64ForFirebase = reader.result.replace('data:image/jpeg;base64,', '');
      console.log('base64ForFirebase', base64ForFirebase)
      console.log('reader.result', reader.result)
      this.setState({
        file: file,
        pickedImagedOne: base64ForFirebase,
        pickerImageForShow: reader.result
      })
    }
    reader.readAsDataURL(file)
  }

  handleClick = () => {
    try {
      this.state.selectedCity ?  Helpers.setCity(uid, this.state.selectedCity) : null
      this.state.carInfo ?  Helpers.setCarInfo(uid, this.state.carInfo) : null
      this.state.contactInfo ?  Helpers.setContactInfo(uid, this.state.contactInfo) : null
      this.state.Name ?  Helpers.setName(uid, this.state.Name) : null
      this.state.PriceDay ?  Helpers.setCarPrice(uid, this.state.PriceDay) : null
      TriggerImage.trigger(this.state.pickedImagedOne, uid) 
    } catch (error) {
      console.log(error)
    }
    uid = uuidv4();
    this.setState({SubmitYourCar: true});
  }

  handleWelcomePage = () => {
    this.setState({welcomePage: true})
  }
  
  render(){
    if (this.state.welcomePage) return <Redirect to="/" />
    if (this.state.SubmitYourCar) return <Redirect to="/carSubmitted" />
    return(
      <div>

        <div className="title">
          <h3>Rent Your Car</h3>
        </div>

          <Input className="selectInput" type="select" name="select" onChange={this.handleSelect}>
            <option value="Barcelona">Barcelona</option>
            <option valye="Helsinki">Helsinki</option>
            <option value="Miami">Miami</option>  
          </Input>

        <div className="imputContainer">
          <Input className="simpleInput" name="carInfo" type="text" placeholder="Car Info"  onChange={this.handleInputs} />
          <Input className="simpleInput" name="PriceDay" type="text" placeholder="Price Per Day" onChange={this.handleInputs} />
          <Input className="simpleInput" name="Name" type="text" placeholder="Name" onChange={this.handleInputs} />
          <Input className="simpleInput" name="contactInfo" type="text" placeholder="Contact Info" onChange={this.handleInputs} />
          <label>Pick An Images</label>
          <CustomInput className="simpleInput"  type="file" name="customFile" onChange={this.handleFile} />
        </div>
        <div>
          <Media className="image" object src={this.state.pickerImageForShow} />
        </div>
        <Button className="buttonSubmit" outline color="primary" onClick={this.handleClick}>Submit Your Car</Button>
        <Button className="buttonWelcome" outline color="primary" onClick={this.handleWelcomePage}>Go Back</Button>
      </div>
    )
  }
}
export default RentYourCar;