angular.module('starter.services', [])

.factory('Lists', function($cordovaSQLite) {

  function getOne(id){
    var query = "SELECT * FROM people WHERE id = ?";
    var personall=[];
    $cordovaSQLite.execute(db, query,[id]).then(function(res) {
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

  function update(u){
    var query = "UPDATE people SET firstname = ? , lastname = ? WHERE id = ?";
    $cordovaSQLite.execute(db, query, [u.firstname, u.lastname, u.id]).then(function(res) {
        console.log("Update ID -> " + u.id);
    }, function (err) {
        console.error(err);
    });
  }

  return {
    all: function() {
      return lists;
    },
    get: function(listid) {
      console.log('listid :'+listid);
      return getOne(listid);
    },
    put: function(u){
      return update(u);
    }
  };
});
