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