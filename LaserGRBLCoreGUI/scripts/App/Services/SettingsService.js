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