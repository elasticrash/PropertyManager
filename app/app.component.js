/**
 * Created by tougo on 17/12/15.
 */
var app = angular.module('PropertyManager', ['md.data.table', 'ngMaterial','pascalprecht.translate']);
app.service('selectedProperties', function () {
        var _dataObj = {};
        this.dataObj = _dataObj;
    })
    .controller('PropertyController', function ($scope, $http, $q, $mdDialog, $mdMedia, selectedProperties) {
        $scope.title1 = 'TESTING';
        $scope.properties = [];
        $scope.selected = [];
        selectedProperties.dataObj.properties = $scope.selected;

        var initProperties = [];

        $scope.$on('RefreshProperties', function(event) {
            loadProperties();
        });

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
                controller: PropertyDialogController,
                templateUrl: 'app/forms/property.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                scope: $scope,
                preserveScope: true,
                locals : {property: {}}
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

        $scope.delete = function(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Διαγραφή Ακινήτου')
                .textContent('Θέλετε να διαγράψεις τον '+ $scope.selected[0].streetname)
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('NAI!')
                .cancel('OXI');
            $mdDialog.show(confirm).then(function() {
                deleteTenant()
                    .then(
                    function (tenant) {
                        loadProperties();
                    });
            }, function() {
            });
        };

        $scope.edit = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            var property = $scope.selected[0];
            $mdDialog.show({
                controller: PropertyDialogController,
                templateUrl: 'app/forms/property.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                targetEvent: ev,
                fullscreen: useFullScreen,
                scope: $scope,
                preserveScope: true,
                locals : {property: property}
            });
        };

        function deleteProperty() {
            var request = $http({
                method: "post",
                url: "/api/property/delete",
                params: {
                    tenant_id: $scope.selected[0].property_id
                }
            });
            return ( request.then(handleSuccess, handleError) );
        }
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
    })
    .controller('LanguageSwitchController', function ($scope, $translate) {
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
    });


