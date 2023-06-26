'use strict';

var dbConn = require('../../config/db.config');
var Property = function (property) {
    this.id = property.id;
    this.name = property.name;
    this.kind_of_property = property.kind_of_property;
    this.listing_type = property.listing_type;
    this.category = property.category;
    this.country = property.country;
    this.state = property.state;
    this.city = property.city;
    this.cityLat = property.cityLat;
    this.cityLng = property.cityLng;
    this.pincode = property.pincode;
    this.locality = property.locality;
    this.society = property.society;
    this.house_no = property.house_no;
    this.no_of_bedroom = property.no_of_bedroom;
    this.no_of_balconies = property.no_of_balconies;
    this.no_of_bathroom = property.no_of_bathroom;
    this.other_room = property.other_room;
    this.furnishing_type = property.furnishing_type;
    this.availability_status = property.availability_status;
    this.possession_by = property.possession_by;
    this.total_floor = property.total_floor;
    this.selected_floor = property.selected_floor;
    this.extra_price = property.extra_price;
    this.overview = property.overview;
    this.description = property.description;
    this.images = property.images;
    this.slug = property.slug;
    this.keywords = property.keywords;
    this.status = property.status;
    this.updated_by = property.updated_by;
    this.deleted_by = property.deleted_by;
    this.created_at = property.created_at;
    this.updated_at = property.updated_at;
};
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
module.exports = Property;