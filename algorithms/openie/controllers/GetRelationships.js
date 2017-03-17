'use strict';

var url = require('url');
var GetRelationships = require('./GetRelationshipsService');

module.exports.getRelationshipsGET = function getRelationshipsGET (req, res, next) {
  GetRelationships.getRelationshipsGET(req.swagger.params, res, next);
};
