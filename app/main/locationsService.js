/**
 * @ngdoc service
 * @name locationsService
 *
 * @description
 * A service used for fetching the list of available locations from a .json file.
 * Might later be used to fetch the list from a server.
 */
'use strict';

angular.module('darkskyForecast.main')
    .service('locationsService', function ($q, $http) {

        /**
         * @ngdoc function
         * @name getLocations
         *
         * @returns {Array} list of locations
         *
         */
        this.getLocations = function () {
            var deferred = $q.defer();

            $http.get('app/main/locations.json')
                .then(function (data) {
                    deferred.resolve(data.data.locations);
                })
                .catch(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    });