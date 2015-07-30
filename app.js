// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/partial-home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: '/partial-about.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },

                // for column two, we'll define a separate controller 
                'columnTwo@about': { 
                    templateUrl: '/partial-table-data.html',
                    controller: 'scotchController'
                },

                'columnThree@about': {
                    templateUrl: '/partial-table-data-test.html',
                    controller: 'itemController',
                    resolve: {
                        items:  function($http){
                            // $http returns a promise for the url data
                            return $http({method: 'GET', url: '/items.php'});
                        }
                    }
                }

            }
            
        })

        .state('home.list', {
            url: '/list',
            templateUrl: '/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

         // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        });
        
});

routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});

routerApp.controller('itemController', function($scope, items){
    $scope.items = items.data;
});

