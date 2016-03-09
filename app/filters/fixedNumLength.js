export default concertListings => {
  concertListings.filter('fixedNumLength', () => {
    return function(num, desiredLength){
      let valToReturn = num.toString();
      const numberLength = valToReturn.length;
      if (valToReturn.length !== desiredLength) {
        while (valToReturn.length !== desiredLength) {
          valToReturn = "0" + valToReturn;
        }
      }
      return valToReturn;
    }
  });
}
