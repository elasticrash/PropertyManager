/**
 * Created by stefanos on 25-Dec-15.
 */
function PropertyDialogController($scope, $http, $q,$mdDialog, property) {
    $scope.property = property;
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
        if(answer === 'PROPERTY') {
            writeProperty()
                .then(
                function (tenant) {
                    $scope.$emit('RefreshProperties');
                });
            $scope.$emit('RefreshProperties');
            $mdDialog.hide(answer)
        }
        else
        {
            $mdDialog.hide(answer)
        }
    };

    function writeProperty() {
                if ($scope.property.property_id) {
                        var request = $http({
                        method: "post",
                        url: "/api/property/update",
                        params: {
                            property_id: $scope.property.property_id,
                            streetname: $scope.property.streetname,
                            number: $scope.property.number,
                            area: $scope.property.area,
                            floor: $scope.property.floor,
                            percentage: $scope.property.percentage,
                            description: $scope.property.description
                        }
                    });
                    return ( request.then(handleSuccess, handleError) );
                }
            else {
                var request = $http({
                    method: "post",
                    url: "/api/property/add",
                    params: {
                        streetname: $scope.property.streetname,
                        number: $scope.property.number,
                        area: $scope.property.area,
                        floor: $scope.property.floor,
                        percentage: $scope.property.percentage,
                        description: $scope.property.description
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
            if ($scope.tenant.tenant_id) {
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

function PaymentDialogController($scope, $http, $q,$mdDialog, payment, selectedProperties) {
    $scope.payment = payment;
    $scope.selectedProperties = selectedProperties;

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
        if(answer === 'PAYMENT') {
            writePayment()
                .then(
                function (tenant) {
                    $scope.$emit('RefreshPayments');
                });
            $scope.$emit('RefreshPayments');
            $mdDialog.hide(answer)
        }
        else
        {
            $mdDialog.hide(answer)
        }
    };

    function writePayment() {

        var monthid;
        $scope.months.forEach(function(month){
            if(month.name === $scope.payment.month)
            {
                monthid = month.month_id;
            }
        });

        if($scope.payment.prop_pay_id){
            var request = $http({
                method: "post",
                url: "/api/payment/update",
                params: {
                }
            });
            return ( request.then(handleSuccess, handleError) );
        }
        else {
            var request = $http({
                method: "post",
                url: "/api/payment/add",
                params: {
                    amount: $scope.payment.amount,
                    pay_date: $scope.payment.pay_date,
                    month_id: monthid,
                    property_id: selectedProperties.dataObj.properties[0].property_id,
                    tenant_id: selectedProperties.dataObj.properties[0].tenant_id
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