'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Property extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Property.init({
        role_name: DataTypes.STRING,
        role_description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Property',
    });

    Property.create = function (newPROP, result) {
        dbConn.query("INSERT INTO re_properties set ?", newPROP, function (err, res) {
            if (err) {
                console.log("error:", err);
                result(err, null);
            } else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    };

    Property.findbyId = function (id, result) {
        dbConn.query("SELECT * FROM re_properties WHERE id= ? ", id, function (err, res) {
            if (err) {
                console.log("error:", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    };

    Property.findAll = function (result) {
        dbConn.query("Select * from re_properties", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('re_properties : ', res);
                result(null, res);
            }
        });
    };

    Property.update = function (id, property, result) {
        dbConn.query("UPDATE re_properties SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    };
    Property.delete = function (id, result) {
        dbConn.query("DELETE FROM re_properties WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    };
    return Property;
};