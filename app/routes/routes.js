export default (concertListings) => {
  concertListings.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('events', {
        url: '',
        template: require('../templates/index.html'),
      })
      .state('event', {
        url: '/events/:eventId',
        template: require('../templates/eventDetails.html'),
      })
  })
}
