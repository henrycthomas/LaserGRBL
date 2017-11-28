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