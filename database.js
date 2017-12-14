const Datastore = require('nedb');
db = new Datastore({filename: __dirname+'db/games.db', autoload: true}); //__dirname+ creates a separate folder for the db - macOS?
const swal = require('sweetalert');


//Add game to DB
exports.addGame = function(groupName, password1, password2, password3, _id){

  var game = {
    "groupName": groupName,
    "password1": password1,
    "password2": password2,
    "password3": password3,
    "_id": _id
  };

  db.insert(game, function(err, newDoc){
    if(err){
      swal(err);
    } else {
      swal({
        text: "Team successfully created!",
        icon: "success"
      });
    }

  });
}

exports.getGames = function(fnc){
  db.find({}, function(err, docs){
    fnc(docs);
  });
}

exports.deleteGame = function(id){
  db.remove({_id:id}, {}, function(err, numRemoved){

  });
}

exports.findOne = function(fnc){
  db.findOne({}, function(err, docs){});
}
