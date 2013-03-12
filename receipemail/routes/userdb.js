
var UserDbModel = require('../routes/userdbmodel')

var D = true;  // Debug Flag

exports.register = function(req, res){

  // DB Model
  var userDbModel = new UserDbModel();
  userDbModel.connect();
  userDbModel.register();


  // Post Data
  if(D) console.log(req.body.postValue1);

  res.redirect("/");
  //res.send("respond with a resource");

};