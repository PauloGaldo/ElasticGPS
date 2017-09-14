(function () {
    'use strict';

    angular
            .module('ElasticGpsApp')
            .config(Configuration);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider'];

    function Configuration($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBclVIaszEyDfUuuk2iFVgpRcJq2gcFCAQ',
            v: '3.27',
            libraries: 'weather,geometry,visualization'
        });

        $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'views/map.html',
                    controller: 'MainCtrl as vm'
                });
        $urlRouterProvider.otherwise('/');
    }

})();