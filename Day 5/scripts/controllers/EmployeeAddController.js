hrApp.controller('EmployeeAddController', ['$scope', '$http', '$location', 'CommonResourcesFactory', 'EmployeeAddService',
    function($scope, $http, $location, CommonResourcesFactory, EmployeeAddService) {
        $scope.employee = {};
        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be yyyy-mm-dd";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";

        //TODO #HR1

        var promise1;
        var promise2;
        var promise3;

        var promise3Fnt = function(result) {
            $scope.managers = result;
        };

        promise1 = EmployeeAddService.findJobs();
        promise2 = EmployeeAddService.findDepartments();
        promise3 = EmployeeAddService.findManagers(promise3Fnt);

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

        /**
         * Reset form
         */
        $scope.reset = function () {
            this.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */
        $scope.create = function (addEmployee) {
            $http({url: CommonResourcesFactory.addEmployeeUrl, method: 'POST', data: addEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeView/' + $scope.employee.employeeId);
                });
        };
        
        $scope.checkValid = function (addEmployee) {
            if($scope.employeeAddForm.$valid) {
                $scope.create(addEmployee);
                $scope.reset();
            }
        };

        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern = /^[0]\.\d{1}(\d)?$/;
}]);