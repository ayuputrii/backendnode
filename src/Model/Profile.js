'use strict';

const profile = require('../Controller/Profile');
const connection = require('../Config/Connection');

exports.showprofile = function(req, res) {
    connection.query('SELECT * FROM profile', function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            profile.ok(rows, res)
        }
    });
}

exports.findprofile = function(req, res) {
    const { id_profile } = req.params;

    connection.query('SELECT * FROM profile WHERE id_profile = ?', [id_profile],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                profile.ok(rows, res)
            }
        })
}

exports.addprofile = function(req, res) {
    const {
        pin_confirm,
        photo,
        first_name,
        last_name,
        verif_email,
        phone,
        password
    } = req.body;

    connection.query(`INSERT INTO profile (pin_confirm, photo, first_name, last_name, verif_email, phone, password) VALUES 
    ('${pin_confirm}', '${photo}', '${first_name}', '${last_name}', '${verif_email}', '${phone}', '${password}')`,
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                profile.create("Successfully Add Data Profile!", res);
            }
        });
};

exports.putprofile = function(req, res) {
    const { id_profile } = req.params;
    const {
        pin_confirm,
        photo,
        first_name,
        last_name,
        verif_email,
        phone,
        password
    } = req.body;

    connection.query('UPDATE profile SET pin_confirm=?, photo=?, first_name=?, last_name=?, verif_email=?, phone=?, password=? WHERE id_profile = ?', [pin_confirm, photo, first_name, last_name, verif_email, phone, password, id_profile],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                profile.ok("Successfully Update Data Profile", res)
            }
        })
}

exports.patchprofile = function(req, res) {
    const { id_profile } = req.params;
    const {
        pin_confirm,
        photo,
        first_name,
        last_name,
        verif_email,
        phone,
        password
    } = req.body;

    connection.query(`SELECT * FROM profile WHERE id_profile=${id_profile}`,
        function(err, result, fields) {
            if (!err) {
                if (result.length) {
                    const data = Object.entries(req.body).map((item) => {
                        return parseInt(item[1]) > 0 ?
                            `${item[0]}=${item[1]}` :
                            `${item[0]}='${item[1]}'`;
                    });
                    console.log(data)
                    let query = `UPDATE profile SET ${data} WHERE id_profile=${id_profile}`;
                    connection.query(query, (err, result, fields) => {
                        if (result.affectedRows) {
                            profile.ok(`Profile ${id_profile} Succesfully updated`, res)
                        } else {
                            profile.status("Failed update profile".res)
                        }
                    });
                } else {
                    profile.status("Id not found", res);
                }
            } else {
                console.log(err);
                profile.error("Failed update profile", res);
            }
        });

};

exports.deleteprofile = function(req, res) {
    const { id_profile } = req.params

    connection.query('DELETE FROM profile WHERE id_profile=?', [id_profile],
        function(error, rows, field) {
            if (error) {
                connection.log(error);
            } else {
                profile.ok("Susccesfully Delete Data Profile", res)
            }
        })
}