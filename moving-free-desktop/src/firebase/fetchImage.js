import firebase from './firebase';

let imageURL = (carId, url) => {
  let carBrandPath = "/car/"+carId+"/details/url"
  return firebase.database().ref(carBrandPath).set(url)
}

class TriggerImage {
  static trigger(image, name){
    fetch('https://us-central1-moving-free.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image,
        name: name
      })
    })
    .catch(err => console.log('Error in the fetch: ', err))
    .then(res => res.json())
    .then(parseRes => {
      return imageURL(name, parseRes.imageUrl)
    });
  }
} 

export default TriggerImage;
