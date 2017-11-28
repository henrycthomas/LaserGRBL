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
