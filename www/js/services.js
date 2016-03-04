angular.module('starter.services', [])

.factory('Lists', function($cordovaSQLite) {
  
  function getOne(id){
    var query = "SELECT id, firstname, lastname FROM people WHERE id = ?";
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

  return {
    all: function() {
      return lists;
    },
    // remove: function(list) {
    //   lists.splice(lists.indexOf(list), 1);
    // },
    get: function(listid) {
      console.log('listid :'+listid);
      return getOne(listid);
      // for (var i = 0; i < lists.length; i++) {
      //   if (lists[i].id === parseInt(listid)) {
      //     return lists[i];
      //   }
      // }
      //return null;
    }
  };
});
