export default concertListings => {
  concertListings.directive('eventHeadline', () => {
    return {
      restrict: 'E',
      scope: {
        event: '='
      },
      template: require('../templates/eventHeadline.html'),
    };
  });
};
