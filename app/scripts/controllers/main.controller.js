(function () {
    'use strict';

    angular
            .module('ElasticGpsApp')
            .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'uiGmapGoogleMapApi', 'ElasticService', 'MapFactory', '$timeout'];

    function MainCtrl($scope, uiGmapGoogleMapApi, ElasticService, MapFactory, $timeout) {
        var vm = this;
        /*VARIABLES*/
        vm.map = {
            control: {},
            center: {latitude: 20, longitude: -100},
            zoom: 5,
            markers: [],
            options: {
                streetViewControl: false,
                mapTypeControl: false,
                scaleControl: true,
                rotateControl: true,
                zoomControl: true
            },
            showTraficLayer: true,
            events: {
                click: function (map) {
                    vm.zoom = map.getZoom();
                },
                dragend: function (map) {
                    vm.zoom = map.getZoom();
                },
                zoom_changed: function (map) {
                    vm.zoom = map.getZoom();
                },
                center_changed: function (map) {
                    console.log(map);
                    vm.zoom = map.getZoom();
                }
            }
        };
        vm.markerControl = {};
        vm.zoom = 15;
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
                        vm.map.zoom = vm.zoom;
                        $timeout(function () {
                            refreshMap();
                        }, 5000);
                    });
        }


    }

})();