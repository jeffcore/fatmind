
angular.module('fatmind', [
    'fatmind.controllers',
    'fatmind.config',
    'ui.router',
    'restangular',
    'ngCookies'
])
.config([
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    'RestangularProvider',
    'APP_APIKEY',
    'APP_URL',
    function($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider, APP_APIKEY, APP_URL) {
        var apiURI = APP_URL;

        RestangularProvider.setBaseUrl(apiURI);

        RestangularProvider.setDefaultHeaders({
            'x-api-key': APP_APIKEY,
            'x-access-token': undefined
        });

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('fatmind', {
           abstract: true,
           template: '<section ui-view></section>'
        })
        .state('fatmind.note', {
            url: '/',
            templateUrl: 'templates/note.html',
            controller: 'NoteCtrl as n',
            data: {
                requireLogin: true // this property will apply to all children of 'app'
            }
        })
        .state('fatmind.register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl as r',
            data: {
                requireLogin: false // this property will apply to all children of 'app'
            }
        })
        .state('fatmind.login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl as l',
            data: {
                requireLogin: false // this property will apply to all children of 'app'
            }
        })
        .state('fatmind.logout', {
            url: '/logout',
            templateUrl: 'templates/logout.html',
            controller: 'LogoutCtrl as lo',
            data: {
                requireLogin: true // this property will apply to all children of 'app'
            }
        });
    //    $locationProvider.html5Mode({
    //       enabled: true,
    //       requireBase: false
    //    });

    }
])
.run([
    '$cookies',
    '$window',
    '$rootScope',
    '$state',
    '$timeout',
    'Restangular',
    function($cookies, $window, $rootScope, $state, $timeout, Restangular){

        $rootScope.user = {
            token: $window.localStorage['token'] || undefined,
            username: $window.localStorage['username'] || undefined
        };

        console.log($rootScope.user.token + ' token');

    //    if (!$rootScope.user.token || $rootScope.user.token == undefined || $rootScope.user.token == 'undefined') {
        //    console.log("got here no token");

        //    $timeout(function() {
        //           $state.go('fatmind.login');
        //       });

    //    } else {
    //        console.log("got here  token");
    //        headers = Restangular.defaultHeaders;
    //        headers['x-access-token'] = $rootScope.user.token;
    //    }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;
            console.log(requireLogin + "requirelogin");
            if (requireLogin && $rootScope.user.token === 'undefined') {
                console.log("got here no token in rootscope");
                event.preventDefault();
                $state.go('fatmind.login');
             } else {
                 if ($rootScope.user.token !== 'undefined') {
                     console.log("got here  token");
                     headers = Restangular.defaultHeaders;
                     headers['x-access-token'] = $rootScope.user.token;
                 }
            }

        });



        //$rootScope.$emit('unauthorized', {});
    //    $rootScope.$on('unauthorized', function(ev, data){
    //        console.log("unauthorized error!");
    //        delete $window.localStorage['token'];
    //        $rootScope.user = { username: undefined };
    //        $state.go('fatmind.login');
    //    });

    }
]);
