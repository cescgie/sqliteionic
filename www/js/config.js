angular.module('app.config', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.lists', {
      url: '/lists',
      views: {
        'tab-lists': {
          templateUrl: 'templates/tab-lists.html',
          controller: 'ListsCtrl'
        }
      }
    })

    .state('tab.list-detail', {
      url: '/lists/:listid',
      views: {
        'tab-home': {
          templateUrl: 'templates/list-detail.html',
          controller: 'ListsDetailCtrl'
        }
      }
    })

    .state('tab.about', {
      url: "/about",
      views: {
        'tab-about': {
          templateUrl: "templates/tab-about.html"
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
