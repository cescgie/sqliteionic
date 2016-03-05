angular.module('app.services', [])

.factory('Lists', function($cordovaSQLite) {

  function getAll(){
    var query = "SELECT * FROM people";
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

  function update(data){
    var query = "UPDATE people SET firstname = ? , lastname = ? WHERE id = ?";
    $cordovaSQLite.execute(db, query, [data.firstname, data.lastname, data.id]).then(function(res) {
        console.log("Update id -> " + data.id);
    }, function (err) {
        console.error(err);
    });
  }

  function insert(data){
    var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
    $cordovaSQLite.execute(db, query, [data.firstname, data.lastname]).then(function(res) {
        console.log("Insert id -> " + res.insertId);
    }, function (err) {
        console.error(err);
    });
  }

  function remove(id){
    var query = "DELETE FROM people WHERE id = ?";
    $cordovaSQLite.execute(db, query, [id]).then(function(res) {
        if(res.rowsAffected > 0) {
            console.log('delete success');
        } else {
            console.log("No results found");
        }
    }, function (err) {
        console.error(err);
    });
  }

  return {
    get: function(id) {
      if(id!='' && id!=null){
        return getOne(id);
      }else{
        return getAll();
      }
    },
    post: function(data) {
      return insert(data);
    },
    put: function(data){
      return update(data);
    },
    delete: function(id) {
      return remove(id);
    }
  };
});
