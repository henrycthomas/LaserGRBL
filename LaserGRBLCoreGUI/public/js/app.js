var app = angular.module('AppName',
    [
        'ui.router',
        'ngMessages',
        'ngSanitize'
    ]);



app.run([
    '$state',
    '$rootScope',
    function ($state, $rootScope) {
        $state.transitionTo('Home', {});
        $rootScope.$on('$stateChangeSuccess', function (event) {
            //pageview / change
    });
}]);

app.filter("numeral", function () {
    return function (input, format) {
        format = format || (input < 100000 ? '0,0.[000]' : '0.0a');
        return numeral(input).format(format);
    }
});

app.filter('range', function() {
        var filter =
            function(arr, lower, upper) {
                for (var i = lower; i <= upper; i++) arr.push(i);
                return arr;
            }
        return filter;
    }
);

app.filter("caps", function () {
    return function (input) {
        return input.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    }
});

app.filter("moment", function () {
    return function (input, format) {
        format = format || 'M/D/YYYY';
        return moment(input).format(format);
    }
});
app.controller('appCtrl', [
    '$scope',
    function (
        $scope
    ) {

}]);
app.controller('ConfigCtrl', [
    '$scope',
    '$commsService',
    '$settingsService',
    function(
    $scope, 
    $commsService,
    $settingsService
    ){
        var mainCommChannel = null;
        function loadGRBL(){
            
            $commsService.mainCommChannel().then(mcc => {
                mainCommChannel = mcc;
                $scope.grblConfig.$setPristine();
                $scope.grbl = mcc.configuration;
            });
        }

        loadGRBL();

        $scope.cancel = (toCancel) => {
            switch(toCancel){
                case "grbl":
                    loadGRBL();
                    break;
            }
        }

        $scope.save = (toSave) => {
            switch(toSave){
                case "grbl":
                    console.log(mainCommChannel);
                    break;
            }
        }

    }
]);
app.config([
    '$stateProvider',
    function($stateProvider){
        $stateProvider.state('Config', {
            title: 'Config',
            url: '',
            views: {
                'page@': {
                    templateUrl: './scripts/App/Config/Config.html',
                    controller: 'ConfigCtrl'
                }
            }
        });
    }
]);
app.factory('$commsService', [
'$http',
'$timeout',
function(
    $http,
    $timeout
) {

    var mainComm = null;

    var host = 'http://localhost:5000/api/'


    return {
        mainCommChannel: () => $http.get(`${host}comms/maincomm`).then(r => r.data),
        commands: {
            get: () => $http.get(`${host}comms/commands`).then(r => r.data),
            enqueue: (commandText) => $http.post(`${host}comms/commands`, JSON.stringify(commandText)).then(r => r.data)
        },
        enums: {
            baudRates: () => $http.get(`${host}settings/enums/baudrates`).then(r => r.data),
            comPorts: () => $http.get(`${host}settings/enums/comports`).then(r => r.data)
        }
    };

}]);

app.factory('$settingsService', [
'$http',
function(
    $http
) {

    var host = 'http://localhost:5000/api/'

    return {
        get: () => $http.get(`${host}settings`).then(r => r.data)
    };

}]);
app.controller('HomeCtrl', [
    '$scope',
    '$commsService',
    '$settingsService',
    '$timeout',
    function(
    $scope, 
    $commsService,
    $settingsService,
    $timeout
    ){
      $commsService.enums.baudRates().then(rates => {
            console.log(rates);
            $scope.baudRates = rates;
            $scope.baudRate = rates[0]
        });

        function loadQueues(){
            $commsService.commands.get().then(queues => {
                $scope.commandQueues = queues;
            });
        }
        loadQueues();

        $commsService.enums.comPorts().then(ports => {
            console.log(ports);
            $scope.comPorts = ports;
            $scope.comPort = ports[0];
        });

        $settingsService.get().then(settings => {
            console.log(settings);
        });

        $scope.sendCommand = () => {
            if($scope.newCommand != ""){
                $commsService.commands.enqueue($scope.newCommand).then(cmd => {
                    $scope.newCommand = "";
                    loadQueues();
                });
            }
        };
    }
]);
app.config([
    '$stateProvider',
    function($stateProvider){
        $stateProvider.state('Home', {
            title: 'Home',
            url: '',
            views: {
                'page@': {
                    templateUrl: './scripts/App/Home/Home.html',
                    controller: 'HomeCtrl'
                }
            }
        });
    }
]);