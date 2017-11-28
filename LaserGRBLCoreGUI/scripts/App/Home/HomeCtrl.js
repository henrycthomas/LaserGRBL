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