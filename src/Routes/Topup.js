'use strict';

module.exports = function(app) {
    const json = require('../Model/Topup');

    // Top Up
    app.route('/topup')
        .get(json.showtopup);

    app.route('/topup/:id_topup')
        .get(json.findtopup);

    app.route('/topup')
        .post(json.addtopup);

    app.route('/topup/:id_topup')
        .put(json.puttopup);

    app.route('/topup/:id_topup')
        .patch(json.patchtopup);

    app.route('/topup/:id_topup')
        .delete(json.deltopup);
    // End Top Up

}