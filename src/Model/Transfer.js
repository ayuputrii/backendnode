'use strict';

const transfer = require('../Controller/Transfer');
const connection = require('../Config/Connection');

exports.showtransfer = function(req, res) {
    connection.query('SELECT * FROM transfer', function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            transfer.ok(rows, res)
        }
    });
}

exports.findtransfer = function(req, res) {
    let name = req.params.name;
    connection.query(`SELECT * FROM profile WHERE first_name LIKE '%${name}%' ORDER BY first_name ASC`, [name],
        function(error, rows, field) {
            if (error) {
                connection.log(error)
            } else {
                transfer.ok(rows, res)
            }
        })
}


exports.addtransfer = function(req, res) {
    const {
        pin_confirm,
        amount,
        balance_left,
        notes
    } = req.body

    connection.query(`INSERT INTO transfer (pin_confirm, amount, balance_left, notes) VALUES
    ('${pin_confirm}', '${amount}','${balance_left}', '${notes}')`,
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                transfer.create("Successfully Add Data Transfer", res)
            }
        }
    )
}

exports.puttransfer = function(req, res) {
    const { id_transfer } = req.params
    const {
        pin_confirm,
        amount,
        balance_left,
        notes
    } = req.body

    connection.query(`UPDATE transfer SET pin_confirm= ?, amount = ?, balance_left = ?, notes = ? WHERE id_transfer = ?`, [pin_confirm, amount, balance_left, notes, id_transfer],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                transfer.ok("Successfully Update Data Transfer", res)
            }
        })

}

exports.patchtransfer = function(req, res) {
    const { id } = req.params.id_transfer
    const {
        pin_confirm,
        amount,
        balance_left,
        notes
    } = req.body

    connection.query(`SELECT * FROM transfer WHERE id_transfer=${id_transfer}`,
        function(err, result, fields) {
            if (!err) {
                if (result.length) {
                    const data = Object.entries(req.body).map((item) => {
                        return parseInt(item[1]) > 0 ?
                            `${item[0]}=${item[1]}` :
                            `${item[0]}='${item[1]}'`;
                    });
                    console.log(data)
                    let query = `UPDATE transfer SET ${data} WHERE id_transfer=${id_transfer}`;
                    connection.query(query, (err, result, fields) => {
                        if (result.affectedRows) {
                            transfer.ok(`Transfer ${id_transfer} Succesfully updated`, res)
                        } else {
                            transfer.status("Failed update transfer".res)
                        }
                    });
                } else {
                    transfer.status("id not found", res);
                }
            } else {
                console.log(err);
                transfer.error("Failed update transfer", res);
            }
        });

};

exports.deletetransfer = function(req, res) {
    const { id_transfer } = req.params

    connection.query('DELETE FROM transfer WHERE id_transfer=?', [id_transfer],
        function(error, rows, fields) {
            if (error) {
                transfer.error("Failed Delete Data Transfer", res)
            } else {
                transfer.ok("Successfully Delete Data Transfer", res)
            }
        });
}