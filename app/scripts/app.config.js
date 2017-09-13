(function () {
    'use strict';

    angular
            .module('ElasticGpsApp')
            .config(Configuration);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Configuration($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'views/map.html'
                });
        $urlRouterProvider.otherwise('/');
    }

})();