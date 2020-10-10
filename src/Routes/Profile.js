'use strict';

module.exports = function(app) {
    const json = require('../Model/Profile');

    // Profile
    app.route('/profile')
        .get(json.showprofile);

    app.route('/profile/:id_profile')
        .get(json.findprofile);

    app.route('/profile')
        .post(json.addprofile);

    app.route('/profile/:id_profile')
        .put(json.putprofile);

    app.route('/profile/:id_profile')
        .patch(json.patchprofile);

    app.route('/profile/:id_profile')
        .delete(json.deleteprofile);
    // End Profile

}