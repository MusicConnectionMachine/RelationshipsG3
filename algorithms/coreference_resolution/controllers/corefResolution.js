'use strict';

var url = require('url');
var corefResolve = require('./corefResolutionService');

module.exports.corefResolution = function corefResolution (req, res, next) {
  corefResolve.corefResolution(req.swagger.params, res, next);
};
