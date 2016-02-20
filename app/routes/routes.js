import mainCtrl from '../controllers/mainCtrl'

export default concertListings => {
  concertListings.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('events', {
        url: '/',
        template: require('../templates/index.html')
      })
      .state('event', {
        url: '/events/:eventid',
        template: '../templates/event.html',
        controller: require('../controllers/eventCtrl')
      })
  })
}
