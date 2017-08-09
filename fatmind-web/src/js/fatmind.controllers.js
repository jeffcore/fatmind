
angular.module('fatmind.controllers', ['restangular', 'ngDialog'])
.controller('NoteCtrl', [
  '$scope', '$rootScope', '$state', '$window', '$timeout','Restangular', 'ngDialog',
    function($scope, $rootScope, $state, $window, $timeout, Restangular, ngDialog){
        $scope.quantum = {note: '', dateCreated: ''};
        $scope.quantumSelected = {note: '', dateCreated: ''};
        $scope.quanta;
        $scope.user = $rootScope.user;

        Restangular.all('quantum').customGET().then(function(response) {
            $scope.quanta = response.data;
        },
        function(error){
            //  $scope.login_error = 'The username or password was incorrect.';
            console.log(error);
            $rootScope.user.token = undefined;
            $rootScope.user.username = undefined;
            $state.go('fatmind.login'); 
        });

        this.postQuantum = function(){
            $scope.quantum.note = $scope.quantum.note.trim();
            console.log($scope.quantum);
            Restangular.one('quantum').customPOST(
                $scope.quantum,
                '',
                {},
                ''
            ).then(function(response){
                $scope.quanta.unshift(response.data);
                $scope.quantum = {note: ''};
            });
        };

        this.searchQuantum = function(){
            Restangular.one('search').customPOST(
                $scope.quantum,
                '',
                {},
                ''
            ).then(function(response){
                console.log('search resposne');
                console.log(response.data);
                $scope.quanta = [];
              //  $scope.quanta = response.data.hits.hits;
                $scope.quanta = response.data;
            },
            function(error){
                //  $scope.login_error = 'The username or password was incorrect.';
                console.log(error);
                $rootScope.user.token = undefined;
                $rootScope.user.username = undefined;
                $state.go('fatmind.login'); 
            });
        };

        this.deleteQuantum = function(index, id){

            console.log("delete id" + id);
            console.log("index" + index);
            console.log($scope.quanta);

            return Restangular.one('quantum', id).remove(
                '',
                Restangular.defaultHeaders
            ).then(function(response){
                    console.log('worked');
                    $scope.quanta.splice(index, 1);
                  //  $state.go('rpac.admin.account', { id: response.id });
                },
                function(){
                  //  $scope.login_error = 'The username or password was incorrect.';
                }
            );
        };

        this.editQuantumDialog = function(index, id){
            console.log($scope.quanta[index]);
            $scope.quantumSelected = $scope.quanta[index];
            ngDialog.open({
               template: 'templates/editnote.html',
               className: 'ngdialog-theme-default width50',
               scope: $scope
            });
        };

        $scope.editQuantum = function () {
            console.log($scope.quantumSelected);

            Restangular.one('quantum', $scope.quantumSelected._id).customPUT(
                $scope.quantumSelected,
                '',
                {},
                Restangular.defaultHeaders
            ).then(function(response){
                ngDialog.closeAll();
            });
        };

    }
])
.controller('LoginCtrl', [
    '$scope', '$rootScope', '$state', '$window', 'Restangular',
        function($scope, $rootScope, $state, $window, Restangular){
            $scope.user = {email: '', password: ''};
            $scope.errorMessage = ''

            this.postLogin = function(){
                $scope.errorMessage = '';
                if($scope.user.email === '' || $scope.user.password === '') {
                    $scope.errorMessage = 'Please fill in both fields.';
                    return true;
                }

                Restangular.one('login').customPOST(
                    $scope.user,
                    '',
                    {},
                    ''
                ).then(function(response){
                    console.log(response);

                    $rootScope.user.token = response.token;
                    $rootScope.user.username = response.username;
                    $window.localStorage['token'] = response.token;
                    $window.localStorage['username'] = response.username;

                    headers = Restangular.defaultHeaders;
                    headers['x-access-token'] = response.token;;

                    console.log($rootScope.user.token);
                    console.log(Restangular.defaultHeaders);
                    $state.go('fatmind.note');
                    //$scope.quanta.push(response.data);
                    //$scope.quantum = {note: ''};
                }, function(err){
                    $scope.errorMessage = 'Invalid email and/or password.';
                    return false;
                });
            };
     }
])
.controller('LogoutCtrl', [
    '$scope', '$rootScope', '$state', '$window', 'Restangular',
        function($scope, $rootScope, $state, $window, Restangular){

               $rootScope.user.token = undefined;
               $window.localStorage['token'] = undefined;
               $window.localStorage['username'] = undefined;

               headers = Restangular.defaultHeaders;
               headers['x-access-token'] = undefined;

               $state.go('fatmind.login');
        }
])
.controller('RegisterCtrl', [
    '$scope', '$rootScope', '$state', '$window', 'Restangular',
        function($scope, $rootScope, $state, $window, Restangular){
            $scope.user = {username: '', email: '', password: ''};
            $scope.errorMessage = ''

            this.postRegister = function(){
                $scope.errorMessage = '';
                if($scope.user.username === '' || $scope.user.password === '' || $scope.user.email === '' ) {
                    $scope.errorMessage = 'Some fields were left blank.';
                    return true;
                }

                Restangular.one('user').customPOST(
                    $scope.user,
                    '',
                    {},
                    ''
                ).then(function(response){
                    console.log(response);

                    $rootScope.user.token = response.token;
                    $rootScope.user.username = response.data.username;
                    $window.localStorage['token'] = response.token;
                    $window.localStorage['username'] = response.data.username;
                    headers = Restangular.defaultHeaders;
                    headers['x-access-token'] = response.token;;

                    console.log($rootScope.user.token);
                    console.log(Restangular.defaultHeaders);
                    $state.go('fatmind.note');
                    //$scope.quanta.push(response.data);
                    //$scope.quantum = {note: ''};
                }, function(err){
                    console.log(err);
                    $scope.errorMessage = err.data.message;
                    return false;
                });
            };

        }
]);
