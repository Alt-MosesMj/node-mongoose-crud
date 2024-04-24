const UserModel = require("../../models/UserModel");
//helper file to prepare responses.
const apiResponse = require("../../helpers/apiResponse");

exports.addUser = function (req, res) {
    // Init user and add missing fields
    var user = new UserModel(req.body);
    user.provider = 'local';  
    // Then save the user
    user.save().then(function (response) {
      return apiResponse.successResponseWithData(res, "User Created Successfully", response);
    }).catch(err => {
      console.error("Error while adding user:", err.message);
      if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
      }
    });
  };