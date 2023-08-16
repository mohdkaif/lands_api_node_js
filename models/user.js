'use strict';
var bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  sequelize.sync({ force: false });

  class User extends Model {

    
    static associate(models) {

      // define association here
    }

  }
  User.init({
    role_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'User',

  });
  User.beforeSave(async (user, options) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  // User.findByEmail(async (email) => {
  //   dbConn.query("SELECT * FROM users WHERE email= ? ", email, function (err, res) {
  //     if (err) {
  //       console.log("error:", err);
  //       result(err, null);
  //     } else {
  //       console.log(res + 'model')
  //       result(null, res);
  //     }
  //   });
  // });
  // User.findByEmail = async function (email) {
  //   try {
  //     const user = await this.findOne({ where: { email } });
  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  return User;
};


