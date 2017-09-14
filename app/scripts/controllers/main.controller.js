(function () {
    'use strict';

    angular
            .module('ElasticGpsApp')
            .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'uiGmapGoogleMapApi', 'ElasticService', 'MapFactory'];

    function MainCtrl($scope, uiGmapGoogleMapApi, ElasticService, MapFactory) {
        var vm = this;
        /*VARIABLES*/
        vm.map = {
            center: {latitude: 20, longitude: -100}, zoom: 5,
            markers: [],
            options: {
                streetViewControl: false,
                mapTypeControl: false,
                scaleControl: true,
                rotateControl: true,
                zoomControl: true
            },
            showTraficLayer: true
        };
        vm.markerControl = {};
        /*METODOS Y/O FUNCIONES*/
        vm.refreshMap = refreshMap;
        
        /**
         * Evento producido al terminar de cargar contenido de vista
         * @param {type} event 
         */
        $scope.$on('$viewContentLoaded', function (event) {
            uiGmapGoogleMapApi.then(function (maps) {
                maps.visualRefresh = true;
                refreshMap();
            });
        });

        /**
         * Funcion para actualizar valores en mapa
         * @returns {undefined}
         */
        function refreshMap() {
            ElasticService
                    .getGpsData()
                    .then(function (response) {
                        console.log(response);
                        var locations = MapFactory.buildMarkers(response.data.hits.hits);
                        console.log(locations);
                        vm.map.center = locations.center;
                        vm.map.markers = locations.markers;
                        vm.map.zoom = 15;
                    });
        }


    }

})();