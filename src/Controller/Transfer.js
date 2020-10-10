'use strict';

const connection = require('../Config/Connection');
const transfer = require('../Model/Transfer');

exports.ok = function(values, res) {
    const data = {
        'status': 200,
        'values': values,
    };
    res.json(data);
    res.end();
}

exports.create = function(values, res) {
    const data = {
        'status': 201,
        'values': values,
    }

    res.json(data);
    res.end();
}
exports.error = function(values, res) {
    const data = {
        'status': 500,
        'success': false,
        'values': values,
    };
    res.json(data);
    res.send();
}

exports.put = function(values, res) {
    const data = {
        'status': 201,
        'values': values,
    }
}
exports.status = function(values, res) {
    const data = {
        'status': 400,
        'success': false,
        'values': values,
    };
    res.json(data);
    res.send();
}