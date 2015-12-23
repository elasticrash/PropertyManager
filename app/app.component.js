/**
 * Created by tougo on 17/12/15.
 */
angular.module('PropertyManager', ['md.data.table', 'ngMaterial'])
    .service('selectedProperties', function () {
        var _dataObj = {};
        this.dataObj = _dataObj;
    })
    .controller('HouseController', function ($scope, $http, $q, $mdDialog, $mdMedia, selectedProperties) {
        $scope.title1 = 'TESTING';
        $scope.properties = [];
        $scope.selected = [];
        selectedProperties.dataObj.properties = $scope.selected;

        var initProperties = [];


        $scope.query = {
            filter: '',
            order: 'streetname',
            limit: 5,
            page: 1
        };
        loadProperties();

        function readProperties() {
            var request = $http({
                method: "get",
                url: "/api/property/list"
            });
            return ( request.then(handleSuccess, handleError) );
        }

        function handleSuccess(response) {
            return response.data;
        }

        function handleError(response) {
            if (
                !angular.isObject(response.data) || !response.data.message
            ) {
                return ( $q.reject("An unknown error occurred.") );
            }
            return ( $q.reject(response.data.message) );
        }

        function loadProperties() {
            readProperties()
                .then(
                function (properties) {
                    applyProperties(properties);
                }
            );
        }

        function applyProperties(newproperties) {
            $scope.properties.total = newproperties.length;
            initProperties = newproperties;
            $scope.properties = newproperties.slice(0, $scope.query.limit);
            $scope.properties.total = initProperties.length;
        }

        $scope.search = function (predicate) {
            $scope.filter = predicate;
            //$scope.deferred = $nutrition.desserts.get($scope.query, success).$promise;
        };

        $scope.onOrderChange = function (order) {
            var asc = order.indexOf("-");
            var field = order.split("-")[order.split("-").length - 1];

            $scope.properties.sort(function (a, b) {
                if (a[field] !== null && b[field] !== null) {
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
            $scope.properties = initProperties.slice((page - 1) * limit, (page - 1) * limit + limit);
            $scope.properties.total = initProperties.length;
        };

        $scope.showProperty = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: 'HouseController',
                templateUrl: 'app/forms/property.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer, type) {
        };
    })
    .config(function ($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    })
    .controller('TenantController', function ($scope, $http, $q, $mdDialog, $mdMedia, selectedProperties) {
        $scope.tenants = [];
        $scope.selected = [];
        selectedProperties.dataObj.tenants = $scope.selected;
        var initTenants = [];

        $scope.$on('RefreshData', function(event) {
            loadRemoteData();
        });

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
                url: "/api/tenant/list"
            });
            return ( request.then(handleSuccess, handleError) );
        }

        function handleSuccess(response) {
            return response.data;
        }

        function handleError(response) {
            if (
                !angular.isObject(response.data) || !response.data.message
            ) {
                return ( $q.reject("An unknown error occurred.") );
            }
            return ( $q.reject(response.data.message) );
        }

        function loadRemoteData() {
            readProperties()
                .then(
                function (properties) {
                    applyRemoteData(properties);
                }
            );
        }

        function applyRemoteData(newproperties) {
            $scope.tenants.total = newproperties.length;
            initTenants = newproperties;
            $scope.tenants = newproperties.slice(0, $scope.query.limit);
            $scope.tenants.total = initTenants.length;
        }

        $scope.search = function (predicate) {
            $scope.filter = predicate;
            //$scope.deferred = $nutrition.desserts.get($scope.query, success).$promise;
        };

        $scope.onOrderChange = function (order) {
            var asc = order.indexOf("-");
            var field = order.split("-")[order.split("-").length - 1];

            $scope.tenants.sort(function (a, b) {
                if (a[field] !== null && b[field] !== null) {
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
            $scope.tenants = initTenants.slice((page - 1) * limit, (page - 1) * limit + limit);
            $scope.tenants.total = initTenants.length;
        };

        $scope.showTenant = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: TenantDialogController,
                templateUrl: 'app/forms/tenant.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                scope: $scope,
                preserveScope: true,
                locals : {tenant: {}}
            });
        };

        //validation needed
        $scope.delete = function(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Διαγραφή Ενοικιαστή')
                .textContent('Θέλετε να διαγράψεις τον '+ $scope.selected[0].last_name)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('NAI!')
                .cancel('OXI');
            $mdDialog.show(confirm).then(function() {
                deleteTenant()
                    .then(
                    function (tenant) {
                        loadRemoteData();
                    });
            }, function() {
            });
        };

        $scope.edit = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            var tenant = $scope.selected[0];
            $mdDialog.show({
                controller: TenantDialogController,
                templateUrl: 'app/forms/tenant.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                targetEvent: ev,
                fullscreen: useFullScreen,
                scope: $scope,
                preserveScope: true,
                locals : {tenant: tenant}
            });
        };

        function deleteTenant() {
            var request = $http({
                method: "post",
                url: "/api/tenant/delete",
                params: {
                    tenant_id: $scope.selected[0].tenant_id
                }
            });
            return ( request.then(handleSuccess, handleError) );
        }

    })
    .controller('PaymentController', function ($scope, $http, $q, $mdDialog, $mdMedia, selectedProperties) {
        $scope.selected = [];

        $scope.ConnectPropertyAndTenant = function (ev) {
            var selectprop = 0;
            var selecttent = 0;
            if (selectedProperties.dataObj.properties) {
                selectprop = selectedProperties.dataObj.properties.length;
            }
            if (selectedProperties.dataObj.tenants) {
                selecttent = selectedProperties.dataObj.tenants.length;
            }

            if (selectprop !== 1 || selecttent !== 1) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('ΠΡΟΣΟΧΗ')
                        .textContent('ΟΙ ΕΠΙΛΕΓΜΕΝΕΣ ΙΔΙΟΚΤΗΣΙΕΣ ΕΙΝΑΙ ' + selectprop
                        + ' ΟI ΕΠΙΛΕΓΜΕΝΟI ΕΝΟΙΚΙΑΣΤEΣ ΕΙΝΑΙ ' + selecttent + ' ΚΑΜΙΑ ΕΝΕΡΓΕΙΑ ΔΕΝ ΕΙΝΑΙ ΔΥΝΑΤΗ')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('ΟΚ')
                        .targetEvent(ev)
                );
            }

            if (selectedProperties.dataObj.properties && selectedProperties.dataObj.properties) {
                if (selectedProperties.dataObj.properties.length === 1 && selectedProperties.dataObj.tenants.length === 1) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('ΠΡΟΣΟΧΗ')
                            .textContent('ΕΙΣΤΕ ΣΙΓΟΥΡΟΙ ΟΤΙ Ο ' + selectedProperties.dataObj.tenants[0].last_name
                            + ' ΕΝΟΙΚΙΑΣΕ ΤΟ ' + selectedProperties.dataObj.properties[0].streetname
                            + ' ' + selectedProperties.dataObj.properties[0].streetnumber)
                            .ariaLabel('Alert Dialog Demo')
                            .ok('ΟΚ')
                            .targetEvent(ev)
                    );
                }
            }
        }

        $scope.showPayment = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: 'PaymentController',
                templateUrl: 'app/forms/payment.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                controllerAs: 'ctrl',
                locals: {months: $scope.months},
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });
        };
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer, type) {
            writePayment()
                .then(
                function (payment) {
                });
            $mdDialog.hide(answer);
        };

        function writePayment() {
            var request = $http({
                method: "post",
                url: "/api/payment/add",
                params: {
                    amount: $scope.payment.first_name,
                    paydate: $scope.payment.paydate,
                    month: $scope.payment.month
                }
            });
            return ( request.then(handleSuccess, handleError) );
        }

        $scope.months = [];
        loadMonths();
        function readMonths() {
            var request = $http({
                method: "get",
                url: "/api/months/list"
            });
            return ( request.then(handleSuccess, handleError) );
        }

        function handleSuccess(response) {
            return response.data;
        }

        function handleError(response) {
            if (
                !angular.isObject(response.data) || !response.data.message
            ) {
                return ( $q.reject("An unknown error occurred.") );
            }
            return ( $q.reject(response.data.message) );
        }

        function loadMonths() {
            readMonths()
                .then(
                function (months) {
                    applyMonths(months);
                }
            );
        }

        function applyMonths(newproperties) {
            $scope.months = newproperties;
        }
    });

function TenantDialogController($scope, $http, $q,$mdDialog, tenant) {
    $scope.tenant = tenant;
    $scope.closeDialog = function () {
        $mdDialog.hide();
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        if(answer === 'TENANT') {
            writeTenant()
                .then(
                function (tenant) {
                    $scope.$emit('RefreshData');
                });
            $scope.$emit('RefreshData');
            $mdDialog.hide(answer)
        }
        else
        {
            $mdDialog.hide(answer)
        }
    };

    function writeTenant() {
        if($scope.tenant.tenant_id){
            var request = $http({
                method: "post",
                url: "/api/tenant/update",
                params: {
                    tenant_id: $scope.tenant.tenant_id,
                    first_name: $scope.tenant.first_name,
                    last_name: $scope.tenant.last_name,
                    afm: $scope.tenant.afm
                }
            });
            return ( request.then(handleSuccess, handleError) );
        }
        else {
            var request = $http({
                method: "post",
                url: "/api/tenant/add",
                params: {
                    first_name: $scope.tenant.first_name,
                    last_name: $scope.tenant.last_name,
                    afm: $scope.tenant.afm
                }
            });
            return ( request.then(handleSuccess, handleError) );
        }
    }

    function handleSuccess(response) {
        return response.data;
    }

    function handleError(response) {
        if (
            !angular.isObject(response.data) || !response.data.message
        ) {
            return ( $q.reject("An unknown error occurred.") );
        }
        return ( $q.reject(response.data.message) );
    }
}