//import * as firebase from 'firebase';
import firebase from './firebase';

class Helpers {
  static setCity(carId, city){
    let carBrandPath = "/car/"+carId+"/details/city"
    return firebase.database().ref(carBrandPath).set(city)
  }
  static setCarInfo(carId, car){
    let carBrandPath = "/car/"+carId+"/details/carInfo"
    return firebase.database().ref(carBrandPath).set(car)
  }
  static setContactInfo(carId, model){
    let carBrandPath = "/car/"+carId+"/details/contactInfo"
    return firebase.database().ref(carBrandPath).set(model)
  }
  static setName(carId, year){
    let carBrandPath = "/car/"+carId+"/details/name"
    return firebase.database().ref(carBrandPath).set(year)
  }
  static setCarPrice(carId, price){
    let carBrandPath = "/car/"+carId+"/details/price"
    return firebase.database().ref(carBrandPath).set(price)
  }
}

export default Helpers;