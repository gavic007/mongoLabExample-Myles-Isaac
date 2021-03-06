'use strict';

angular.module("appModule")
    .controller('mainCtrl', function($scope, $http){
        console.log("main controller loaded!");

        $scope.name = "";
        $scope.weight = "";
        $scope.heaviestPet = {name: "Absent", weight: -1};

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.data = pets;
                $scope.heaviestPet = $scope.heaviest($scope.data);
            });
        };

        $scope.addData = function(){
            if($scope.name.length >= 1 && $scope.weight > 0) {
                $http.post('api/pets', {name: $scope.name, weight: $scope.weight}).success(function(){
                    $scope.getPets();
                });
                $scope.name = "";
                $scope.weight = "";
            }
        };

        $scope.removeData = function(index){
            $http.delete('/api/pets/' + $scope.data[index]._id).success(function(){
                $scope.getPets();
            });
        };



        $scope.heaviest = function(arrayOfPets) {
            var heavy = {name: "Absent", weight: -1};
            for(var i = 0; i < arrayOfPets.length; i++) {
                if (heavy.weight < arrayOfPets[i].weight) {
                    heavy = arrayOfPets[i];
                }
            }
            return heavy;
        }

    });