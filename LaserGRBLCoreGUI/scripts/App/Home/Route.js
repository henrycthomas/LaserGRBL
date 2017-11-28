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