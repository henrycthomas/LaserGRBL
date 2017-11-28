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