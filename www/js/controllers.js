angular.module('starter.controllers', [])

.controller("ExampleController", function($scope,$cordovaSQLite) {

    $scope.infos = [{'info':'success'}];

    $scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
        $scope.personall = all();
    }

    //$scope.persons = [{'firstname':'tono','lastname':'ko'},{'firstname':'dani','lastname':'tu'}];
    //$scope.personall = [{'firstname':'kura','lastname':'miao'},{'firstname':'bruno','lastname':'gukguk'}];

    $scope.select = function(lastname) {
        var query = "SELECT id, firstname, lastname FROM people WHERE lastname = ?";
        $scope.persons = [];
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i=0; i<res.rows.length; i++){
                    $scope.persons.push({
                           id:res.rows.item(i).id,
                           firstname:res.rows.item(i).firstname,
                           lastname:res.rows.item(i).lastname
                   });
                }
            } else {
                console.log("No results found");
                $scope.persons = '';
            }
        }, function (err) {
            console.error(err);
            $scope.persons = '';
        });
    }

    function all(){
      var query = "SELECT id, firstname, lastname FROM people";
      var personall=[];
      $cordovaSQLite.execute(db, query).then(function(res) {
          if(res.rows.length > 0) {
              for(var i=0; i<res.rows.length; i++){
                  personall.push({
                         id:res.rows.item(i).id,
                         firstname:res.rows.item(i).firstname,
                         lastname:res.rows.item(i).lastname
                  });
              }
          } else {
              console.log("No results found");
              personall = '';
          }
      }, function (err) {
          console.error(err);
          personall = '';
      });
      return personall;
    }

    $scope.selectAll = function(){
      $scope.personall = all();
    }

    $scope.delete = function(id) {
        var query = "DELETE FROM people WHERE id = ?";
        $scope.persons = [];
        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
            if(res.rowsAffected > 0) {
                console.log('delete success');
            } else {
                console.log("No results found");
            }
            //$scope.persons= all();
            $scope.personall = all();
        }, function (err) {
            console.error(err);
        });
    }

});
