'use strict';

module.exports = function(app) {
    const json = require('../Model/Transfer');
    // Transfer
    app.route('/transfer')
        .get(json.showtransfer);

    app.route('/transfer/:name')
        .get(json.findtransfer);

    app.route('/transfer')
        .post(json.addtransfer);

    app.route('/transfer/:id_transfer')
        .put(json.puttransfer);

    app.route('/transfer/:id_transfer')
        .patch(json.patchtransfer);

    app.route('/transfer/:id_transfer')
        .delete(json.deletetransfer);
    // End Transfer
}