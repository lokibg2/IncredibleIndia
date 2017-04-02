angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('tabsController.planner', {
        url: '/page1',
        views: {
          'tab1': {
            templateUrl: 'templates/planner.html',
            controller: 'plannerCtrl'
          }
        }
      })
      .state('tabsController.plan', {
        url: '/pagePlan',
        views: {
          'tab1': {
            templateUrl: 'templates/plan.html',
            controller: 'planCtrl'
          }
        }
      })

      .state('tabsController.placeOfInterest', {
        url: '/page2',
        views: {
          'tab4': {
            templateUrl: 'templates/placeOfInterest.html',
            controller: 'placeOfInterestCtrl'
          }
        }
      })

      .state('tabsController.search', {
        url: '/page3',
        views: {
          'tab5': {
            templateUrl: 'templates/search.html',
            controller: 'searchCtrl'
          }
        }
      })

      .state('tabsController.utilities', {
        url: '/page4',
        views: {
          'tab2': {
            templateUrl: 'templates/utilities.html',
            controller: 'utilitiesCtrl'
          }
        }
      })

      .state('tabsController.profile', {
        url: '/page5',
        views: {
          'tab3': {
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl'
          }
        }
      })

      .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })

      /*
       The IonicUIRouter.js UI-Router Modification is being used for this route.
       To navigate to this route, do NOT use a URL. Instead use one of the following:
       1) Using the ui-sref HTML attribute:
       ui-sref='tabsController.pOIDetail'
       2) Using $state.go programatically:
       $state.go('tabsController.pOIDetail');
       This allows your app to figure out which Tab to open this page in on the fly.
       If you're setting a Tabs default page or modifying the .otherwise for your app and
       must use a URL, use one of the following:
       /page1/tab4/page8
       /page1/tab5/page8
       */
      .state('tabsController.pOIDetail', {
        url: '/page8',
        views: {
          'tab4': {
            templateUrl: 'templates/pOIDetail.html',
            controller: 'pOIDetailCtrl'
          }

        }
      })

      .state('tabsController.pOIDetail2', {
        url: '/page18',
        views: {

          'tab5': {
            templateUrl: 'templates/pOIDetail2.html',
            controller: 'pOIDetailCtrl2'
          }
        }
      })

      /*
       The IonicUIRouter.js UI-Router Modification is being used for this route.
       To navigate to this route, do NOT use a URL. Instead use one of the following:
       1) Using the ui-sref HTML attribute:
       ui-sref='tabsController.placeInfo'
       2) Using $state.go programatically:
       $state.go('tabsController.placeInfo');
       This allows your app to figure out which Tab to open this page in on the fly.
       If you're setting a Tabs default page or modifying the .otherwise for your app and
       must use a URL, use one of the following:
       /page1/tab4/page9
       /page1/tab5/page9
       */
      .state('tabsController.placeInfo', {
        url: '/page9',
        views: {
          'tab4': {
            templateUrl: 'templates/placeInfo.html',
            controller: 'placeInfoCtrl'
          },
        }
      })
      .state('tabsController.placeInfo2', {
        url: '/page19',
        views: {
          'tab5': {
            templateUrl: 'templates/placeInfo2.html',
            controller: 'placeInfoCtrl2'
          }
        }
      })

      .state('tabsController.tourOperators', {
        url: '/page10',
        views: {
          'tab5': {
            templateUrl: 'templates/tourOperators.html',
            controller: 'tourOperatorsCtrl'
          }
        }
      })

      .state('agentInfo', {
        url: '/page11',
        templateUrl: 'templates/agentInfo.html',
        controller: 'agentInfoCtrl'
      })

      .state('tabsController.guides', {
        url: '/page12',
        views: {
          'tab5': {
            templateUrl: 'templates/guides.html',
            controller: 'guidesCtrl'
          }
        }
      })

      .state('tabsController.guideInfo', {
        url: '/page13',
        views: {
          'tab5': {
            templateUrl: 'templates/guideInfo.html',
            controller: 'guideInfoCtrl'
          }
        }
      })

      .state('tabsController.emergencyNumbers', {
        url: '/page14',
        views: {
          'tab2': {
            templateUrl: 'templates/emergencyNumbers.html',
            controller: 'emergencyNumbersCtrl'
          }
        }
      })

      .state('tabsController.currencyConverter', {
        url: '/page15',
        views: {
          'tab2': {
            templateUrl: 'templates/currencyConverter.html',
            controller: 'currencyConverterCtrl'
          }
        }
      })

      .state('tabsController.weatherUpdates', {
        url: '/page16',
        views: {
          'tab2': {
            templateUrl: 'templates/weatherUpdates.html',
            controller: 'weatherUpdatesCtrl'
          }
        }
      })

      .state('tabsController.embassy', {
        url: '/page17',
        views: {
          'tab2': {
            templateUrl: 'templates/embassy.html',
            controller: 'embassyCtrl'
          }
        }
      })


    $urlRouterProvider.otherwise('/page1/page1')


  });
