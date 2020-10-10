'use strict';

const topup = require('../Controller/Topup');
const connection = require('../Config/Connection');

exports.showtopup = function(req, res) {
    connection.query(`SELECT * FROM topup`, function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            topup.ok(rows, res);
        }
    })
}

exports.findtopup = function(req, res) {
    let { id_topup } = req.params.id_topup;
    connection.query(`SELECT * FROM topup WHERE id_topup = ?`, [id_topup],
        function(error, rows, fields) {
            if (error) {
                connection.log(error)
            } else {
                topup.ok(rows, res)
            }
        })
}

exports.addtopup = function(req, res) {
    const {
        howto_topup
    } = req.body

    connection.query(`INSERT INTO topup (howto_topup) VALUES 
    ('${howto_topup}')`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                topup.create("Successfully Add Data Top Up", res);
            }
        })
}

exports.puttopup = function(req, res) {
    const { id_topup } = req.params
    const {
        howto_topup
    } = req.body

    connection.query(`UPDATE topup SET howto_topup = ? WHERE id_topup = ?`, [howto_topup, id_topup],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                topup.ok("Successfully Update Data Top Up", res)
            }
        })
}

exports.patchtopup = function(req, res) {
    const { id_topup } = req.params
    const { howto_topup } = req.body

    connection.query(`SELECT * FROM topup WHERE id_topup=${id_topup}`,
        function(err, result, fields) {
            if (!err) {
                if (result.length) {
                    const data = Object.entries(req.body).map((item) => {
                        return parseInt(item[1]) > 0 ?
                            `${item[0]}=${item[1]}` :
                            `${item[0]}='${item[1]}'`;
                    });
                    console.log(data)
                    let query = `UPDATE topup SET ${data} WHERE id_topup=${id_topup}`;
                    connection.query(query, (err, result, fields) => {
                        if (result.affectedRows) {
                            topup.ok(`Top Up ${id_topup} Succesfully updated`, res)
                        } else {
                            topup.status("Failed update Top Up".res)
                        }
                    });
                } else {
                    topup.status("id not found", res);
                }
            } else {
                console.log(err);
                topup.error("Failed update Top Up", res);
            }
        });

};

exports.deltopup = function(req, res) {
    const { id_topup } = req.params

    connection.query('DELETE FROM topup WHERE id_topup=?', [id_topup],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                topup.ok("Successfully Delete Data Top Up", res)
            }
        })
}