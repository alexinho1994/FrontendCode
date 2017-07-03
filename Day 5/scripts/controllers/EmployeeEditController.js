hrApp.controller('EmployeeEditController', ['$scope', '$http', '$routeParams', '$location', 'CommonResourcesFactory',
    'CommonResourcesFactoryBackup', 'EmployeeEditService',
    function ($scope, $http, $routeParams, $location, CommonResourcesFactory, CommonResourcesFactoryBackup, EmployeeEditService) {
        $scope.employee = {};
        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be yyyy-mm-dd";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";

        //TODO #HR5
        var promise1;
        var promise2;
        var promise3;
        var promise4;

        var promise3Fnt = function(result) {
            $scope.managers = result;
        };

        promise1 = EmployeeEditService.findJobs();
        promise2 = EmployeeEditService.findDepartments();
        promise3 = EmployeeEditService.findManagers(promise3Fnt);
        promise4 = EmployeeEditService.findOne($routeParams.employeeId);

        promise1.then(
            function(result) {
                $scope.jobs = result.data;
            }
        );

        promise2.then(
            function(result) {
                $scope.departments = result.data;
            }
        );

        promise4.then(
            function(result) {
                $scope.employee = result.data;
            }
        );

        /**
         * Reset form
         */
        $scope.reset = function () {
            $scope.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */
        $scope.edit = function (editEmployee) {
            $http({url: commonResourcesFactory.editEmployeeUrl, method: 'PUT', data: addEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeView/' + $scope.employee.employeeId);
                });
        };


        $scope.checkValid = function (editEmployee) {
            if($scope.employeeAddForm.$valid) {
                $scope.edit(editEmployee);
                $scope.reset();
            }
        };

        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern =  /^[0]\.\d{1}(\d)?$/;

    }]);