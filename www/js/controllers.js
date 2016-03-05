angular.module('app.controllers', [])

.controller("HomeCtrl", function($scope,$cordovaSQLite,$ionicModal,ionicToast,Lists,$ionicHistory) {

    $scope.refresh = function(){
      $scope.personall = Lists.get();
      console.log('refresh');
    };

    $scope.delete = function(id) {
        Lists.delete(id);
        ionicToast.show('Contact deleted.', 'bottom', false, 2500);
        $scope.personall = Lists.get();
    };

    $scope.create = function(data) {
      Lists.post(data);
      $scope.personall = Lists.get();
      $scope.modal.hide();
      ionicToast.show('New contact inserted.', 'bottom', false, 2500);
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

})

.controller('ListsDetailCtrl', function($scope, $cordovaSQLite, $stateParams, $ionicModal, Lists, ionicToast,$ionicHistory) {
    $scope.lists = Lists.get($stateParams.listid);

    $scope.update = function(data) {
        Lists.put(data);
        $scope.lists = Lists.get(data.id);
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
