'use strict';

/**
 * Module dependencies
 */
var churchesPolicy = require('../policies/churches.server.policy'),
  churches = require('../controllers/churches.server.controller');

module.exports = function(app) {
  // Churches Routes
  app.route('/api/churches').all(churchesPolicy.isAllowed)
    .get(churches.list)
    .post(churches.create);

  app.route('/api/churches/:churchId').all(churchesPolicy.isAllowed)
    .get(churches.read)
    .put(churches.update)
    .delete(churches.delete);

  // Finish by binding the Church middleware
  app.param('churchId', churches.churchByID);
};
