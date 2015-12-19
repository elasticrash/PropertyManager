/**
 * Created by tougo on 17/12/15.
 */
angular.module('PropertyManager', ['md.data.table','ngMaterial'])
.controller('AppHouseController', function($scope,$http, $q) {
    $scope.title1 = 'TESTING';
        $scope.properties = [];
        $scope.selected = [];

        var initProperties = [];
        $scope.query = {
            filter: '',
            order: 'streetname',
            limit: 5,
            page: 1
        };
        loadRemoteData();
        function readProperties() {
            var request = $http({
                method: "get",
                url: "http://localhost:3000/api/property/list",
                params: {
                    action: "add"
                },
                data: {
                    name: name
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function handleSuccess( response ) {
            return response.data ;
        }

        function handleError( response ) {
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
            ) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            return( $q.reject( response.data.message ) );
        }

        function loadRemoteData() {
            readProperties()
                .then(
                function (properties) {
                    applyRemoteData(properties);
                }
            );
        }

        function applyRemoteData( newproperties ) {
            $scope.properties.total = newproperties.length;
            initProperties = newproperties;
            $scope.properties = newproperties.slice(0,$scope.query.limit);
            $scope.properties.total = initProperties.length;
        }

        $scope.search = function (predicate) {
            $scope.filter = predicate;
            //$scope.deferred = $nutrition.desserts.get($scope.query, success).$promise;
        };

        $scope.onOrderChange = function (order) {
            var asc = order.indexOf("-");
            var field = order.split("-")[order.split("-").length-1];

            $scope.properties.sort(function (a, b) {
                if(a[field]!== null && b[field]!== null) {
                    return a[field].toString().localeCompare(b[field].toString());
                }
                else {
                    return a
                }
            });

            if (asc === -1) {
                return $scope.properties.reverse();
            }
            return $scope.properties;
        };

        $scope.onPaginationChange = function (page, limit) {
            $scope.properties = initProperties.slice((page-1)*limit,(page-1)*limit+limit);
            $scope.properties.total = initProperties.length;
        };
    })
    .controller('AppTennantController', function($scope,$http, $q) {
        $scope.tenants = [];
        $scope.selected = [];

        var initTennants = [];
        $scope.query = {
            filter: '',
            order: 'streetname',
            limit: 5,
            page: 1
        };
        loadRemoteData();
        function readProperties() {
            var request = $http({
                method: "get",
                url: "http://localhost:8002/rest/getTenant",
                params: {
                    action: "add"
                },
                data: {
                    name: name
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function handleSuccess( response ) {
            return response.data ;
        }

        function handleError( response ) {
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
            ) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            return( $q.reject( response.data.message ) );
        }

        function loadRemoteData() {
            readProperties()
                .then(
                function (properties) {
                    applyRemoteData(properties);
                }
            );
        }

        function applyRemoteData( newproperties ) {
            $scope.tenants.total = newproperties.length;
            initTennants = newproperties;
            $scope.tenants = newproperties.slice(0,$scope.query.limit);
            $scope.tenants.total = initTennants.length;
        }

        $scope.search = function (predicate) {
            $scope.filter = predicate;
            //$scope.deferred = $nutrition.desserts.get($scope.query, success).$promise;
        };

        $scope.onOrderChange = function (order) {
            var asc = order.indexOf("-");
            var field = order.split("-")[order.split("-").length-1];

            $scope.tenants.sort(function (a, b) {
                if(a[field]!== null && b[field]!== null) {
                    return a[field].toString().localeCompare(b[field].toString());
                }
                else {
                    return a
                }
            });

            if (asc === -1) {
                return $scope.tenants.reverse();
            }
            return $scope.tenants;
        };

        $scope.onPaginationChange = function (page, limit) {
            $scope.tenants = initTennants.slice((page-1)*limit,(page-1)*limit+limit);
            $scope.tenants.total = initTennants.length;
        };
    });

