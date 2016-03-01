// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;

var example = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");

  });
})

example.controller("ExampleController", function($scope, $cordovaSQLite) {

    $scope.infos = [{'info':'success'}];

    $scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }

    $scope.persons = [{'firstname':'tono','lastname':'ko'},{'firstname':'dani','lastname':'tu'}];
    $scope.personall = [{'firstname':'kura','lastname':'miao'},{'firstname':'bruno','lastname':'gukguk'}];

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
    $scope.selectAll = function(){
      var query = "SELECT id, firstname, lastname FROM people";
      $scope.personall=[];
      $cordovaSQLite.execute(db, query).then(function(res) {
          if(res.rows.length > 0) {
              for(var i=0; i<res.rows.length; i++){
                  $scope.personall.push({
                         id:res.rows.item(i).id,
                         firstname:res.rows.item(i).firstname,
                         lastname:res.rows.item(i).lastname
                  });
              }
          } else {
              console.log("No results found");
              $scope.personall = '';
          }
      }, function (err) {
          console.error(err);
          $scope.personall = '';
      });
    }

    $scope.delete = function(id) {
        var query = "DELETE FROM people WHERE id = ?";
        $scope.persons = [];
        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
            if(res.rowsAffected < 1) {
                console.log('delete success');
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }

});
