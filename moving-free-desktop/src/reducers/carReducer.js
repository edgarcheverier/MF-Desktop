const handleCars = (state= [], action) => {
  switch(action.type) {
    case 'SEARCH_CARS':
      return action.data;
    default: 
      return state  
  }
}


export default handleCars;

