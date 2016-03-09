export default (concertListings) => {
  concertListings.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('events', {
        url: '',
        template: require('../templates/index.html'),
        controller: 'EventsCtrl',
        controllerAs: 'vm'
      })
      .state('event', {
        url: '/events/:eventId',
        template: require('../templates/eventDetails.html'),
        controller: 'EventsCtrl',
        controllerAs: 'vm'
      })
  }])
}
