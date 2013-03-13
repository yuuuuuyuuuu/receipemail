
var UserDbModel = require('../routes/userdbmodel')

var D = true;  // Debug Flag

exports.register = function(req, res){

  // DB Model
  var userDbModel = new UserDbModel();
  userDbModel.connect();
  userDbModel.register(req.body.userId, req.body.registrationId);


  // Post Data
  if(D) console.log(req.body.postValue1);

  res.redirect("/");
  //res.send("respond with a resource");

};