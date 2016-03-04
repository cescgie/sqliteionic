angular.module('starter.controllers', [])

.controller("ExampleController", function($scope,$cordovaSQLite,$ionicModal,ionicToast) {

    $scope.refresh = function(){
      $scope.personall = all();
      console.log('refresh');
    };

    $scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
        $scope.personall = all();
    };

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
    };

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
    };

    $scope.delete = function(id) {
        var query = "DELETE FROM people WHERE id = ?";
        $scope.persons = [];
        $cordovaSQLite.execute(db, query, [id]).then(function(res) {
            if(res.rowsAffected > 0) {
                console.log('delete success');
                ionicToast.show('Contact deleted.', 'bottom', false, 2500);
            } else {
                console.log("No results found");
                ionicToast.show('No data selected.', 'bottom', false, 2500);
            }
            //$scope.persons= all();
            $scope.personall = all();
        }, function (err) {
            console.error(err);
        });
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    $scope.createContact = function(u) {
      // $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
      var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
      $cordovaSQLite.execute(db, query, [u.firstName, u.lastName]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
          console.error(err);
      });
      $scope.personall = all();
      $scope.modal.hide();
      ionicToast.show('New contact inserted.', 'bottom', false, 2500);
    };

})

.controller('ListsDetailCtrl', function($scope, $cordovaSQLite, $stateParams, $ionicModal, Lists, ionicToast) {
  $scope.lists = Lists.get($stateParams.listid);

  $scope.update = function(u) {
      var query = "UPDATE people SET firstname = ? , lastname = ? WHERE id = ?";
      $cordovaSQLite.execute(db, query, [u.firstname, u.lastname, u.id]).then(function(res) {
          console.log("Update ID -> " + u.id);
      }, function (err) {
          console.error(err);
      });
      $scope.lists = Lists.get(u.id);
      $scope.modal.hide();
      ionicToast.show('Contact information updated.', 'bottom', false, 2500);
  };

  $ionicModal.fromTemplateUrl('templates/editmodal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function(id) {
    $scope.lists = Lists.get(id);
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

});
