/**
 * @ngdoc overview 
 * @name service.coordService
 */
'use strict';

angular.module('service.coordService', [])

/**
 * @ngdoc method
 * @methodOf service.coordService.coordService
 * @name coordService
 *
 * @description
 * A service used for fetching the coordinates of a location via http.
 */
.service('coordService', function ($q, $http, GOOGLE_API) {

    /**
     * @ngdoc function
     * @name getCoords
     *
     * @param {String} location the location name
     * @returns {Object} object containing the latitude and longitude
     *
     */
    this.getCoords = function (location) {
        var deferred = $q.defer();

        $http({
                method: 'GET',
                timeout: 300000,
                url: GOOGLE_API.URL,
                params: {
                    'address': location,
                    'key': GOOGLE_API.KEY
                }
            })
            .then(function (data) {
                if (parseInt(data.status) === 200) {
                    deferred.resolve(data.data.results[0].geometry.location);
                } else {
                    deferred.reject(data.status);
                }

            })
            .catch(function (data) {
                deferred.reject(data.error_message);
            });

        return deferred.promise;
    }
});