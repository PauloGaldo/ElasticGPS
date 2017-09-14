(function () {
    'use strict';

    angular
            .module('ElasticGpsApp')
            .service('ElasticService', ElasticService);

    ElasticService.$inject = ['$http', '$q'];

    function ElasticService($http, $q) {

        this.getGpsData = function () {
            var deferred = $q.defer();
            $http({
                url: 'locations.json',
                method: 'GET'
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

    }


})();