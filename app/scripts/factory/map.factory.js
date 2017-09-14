(function () {
    'use strict';

    angular
            .module('ElasticGpsApp')
            .factory('MapFactory', MapFactory);

    MapFactory.$inject = ['Constant'];

    function MapFactory(Constant) {
        return {
            buildMarkers: buildMarkers
        };

        function buildMarkers(element) {
            var locations = {
                center: {
                    latitude: element[element.length - 1]._source.latitud,
                    longitude: element[element.length - 1]._source.longitud
                },
                markers: []
            };
            angular.forEach(element, function (value, key) {
                locations.markers.push({
                    location: {
                        id: value._id,
                        name: 'CN Tower',
                        latitude: value._source.latitud,
                        longitude: value._source.longitud
                    },
                    id: value._id,
                    icon: (key === element.length - 1) ? Constant.redicon : Constant.blueicon
                });
            });
            return locations;
        }
    }

})();