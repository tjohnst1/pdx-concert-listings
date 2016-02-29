export default concertListings => {
  concertListings.filter('formatTime', () => {
    return function(unformattedTime){
      let timeArr = unformattedTime.split(":");
      let amOrPm = "";
      if (Number(timeArr[0]) > 12){
        amOrPm = "PM"
        timeArr[0] = Number(timeArr[0]) - 12
      } else {
        amOrPm = "AM"
      }
      timeArr.pop();
      timeArr = timeArr.join(":");
      return `${timeArr} ${amOrPm}`
    }
  })
}
