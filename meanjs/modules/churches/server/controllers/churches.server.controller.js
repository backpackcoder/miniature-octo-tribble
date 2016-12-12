'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Church = mongoose.model('Church'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Church
 */
exports.create = function(req, res) {
  var church = new Church(req.body);
  church.user = req.user;

  church.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(church);
    }
  });
};

/**
 * Show the current Church
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var church = req.church ? req.church.toJSON() : {};
  res.jsonp(church);
};

/**
 * Update a Church
 */
exports.update = function(req, res) {
  var church = req.church;

  church = _.extend(church, req.body);

  church.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(church);
    }
  });
};

/**
 * Delete an Church
 */
exports.delete = function(req, res) {
  var church = req.church;

  church.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(church);
    }
  });
};

/**
 * List of Churches
 */
exports.list = function(req, res) {
  Church.find().exec(function(err, churches) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(churches);
    }
  });
};

/**
 * Church middleware
 */
exports.churchByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Church is invalid'
    });
  }

  Church.findById(id).exec(function (err, church) {
    if (err) {
      return next(err);
    } else if (!church) {
      return res.status(404).send({
        message: 'No Church with that identifier has been found'
      });
    }
    req.church = church;
    next();
  });
};
