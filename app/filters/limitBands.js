export default concertListings => {
  concertListings.filter('limitBands', () => {
    return function(arr, num){
      let bandArr = arr;
      if (bandArr.length > num){
        bandArr = bandArr.slice(0, num);
        return bandArr.join(', ').concat(', and More');
      } else {
        return bandArr.join(', ')
      }
    }
  })
}
