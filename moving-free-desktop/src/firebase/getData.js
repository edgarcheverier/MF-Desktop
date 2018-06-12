import firebase from '../firebase/firebase';

const getData = async () => {
  let data;
  await fetch('https://moving-free.firebaseio.com/car.json')
  .catch(err => console.log('Error in the fetch: ', err))
  .then(res => res.json())
  .then(parseRes => {
    data = parseRes;
  });
  return data;
}

export default  getData;
