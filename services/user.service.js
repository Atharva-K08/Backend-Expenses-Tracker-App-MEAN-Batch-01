const UserModel = require("../models/user.model");

module.exports.creatUser = async (payload) => {
  return await UserModel.create(payload);
};

module.exports.findUser = async (email) => {
  return await UserModel.findOne({
    email,
  });
};
