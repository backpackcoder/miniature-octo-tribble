'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Church = mongoose.model('Church'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  church;

/**
 * Church routes tests
 */
describe('Church CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Church
    user.save(function () {
      church = {
        name: 'Church name'
      };

      done();
    });
  });

  it('should be able to save a Church if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Church
        agent.post('/api/churches')
          .send(church)
          .expect(200)
          .end(function (churchSaveErr, churchSaveRes) {
            // Handle Church save error
            if (churchSaveErr) {
              return done(churchSaveErr);
            }

            // Get a list of Churches
            agent.get('/api/churches')
              .end(function (churchesGetErr, churchesGetRes) {
                // Handle Churches save error
                if (churchesGetErr) {
                  return done(churchesGetErr);
                }

                // Get Churches list
                var churches = churchesGetRes.body;

                // Set assertions
                (churches[0].user._id).should.equal(userId);
                (churches[0].name).should.match('Church name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Church if not logged in', function (done) {
    agent.post('/api/churches')
      .send(church)
      .expect(403)
      .end(function (churchSaveErr, churchSaveRes) {
        // Call the assertion callback
        done(churchSaveErr);
      });
  });

  it('should not be able to save an Church if no name is provided', function (done) {
    // Invalidate name field
    church.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Church
        agent.post('/api/churches')
          .send(church)
          .expect(400)
          .end(function (churchSaveErr, churchSaveRes) {
            // Set message assertion
            (churchSaveRes.body.message).should.match('Please fill Church name');

            // Handle Church save error
            done(churchSaveErr);
          });
      });
  });

  it('should be able to update an Church if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Church
        agent.post('/api/churches')
          .send(church)
          .expect(200)
          .end(function (churchSaveErr, churchSaveRes) {
            // Handle Church save error
            if (churchSaveErr) {
              return done(churchSaveErr);
            }

            // Update Church name
            church.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Church
            agent.put('/api/churches/' + churchSaveRes.body._id)
              .send(church)
              .expect(200)
              .end(function (churchUpdateErr, churchUpdateRes) {
                // Handle Church update error
                if (churchUpdateErr) {
                  return done(churchUpdateErr);
                }

                // Set assertions
                (churchUpdateRes.body._id).should.equal(churchSaveRes.body._id);
                (churchUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Churches if not signed in', function (done) {
    // Create new Church model instance
    var churchObj = new Church(church);

    // Save the church
    churchObj.save(function () {
      // Request Churches
      request(app).get('/api/churches')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Church if not signed in', function (done) {
    // Create new Church model instance
    var churchObj = new Church(church);

    // Save the Church
    churchObj.save(function () {
      request(app).get('/api/churches/' + churchObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', church.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Church with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/churches/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Church is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Church which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Church
    request(app).get('/api/churches/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Church with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Church if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Church
        agent.post('/api/churches')
          .send(church)
          .expect(200)
          .end(function (churchSaveErr, churchSaveRes) {
            // Handle Church save error
            if (churchSaveErr) {
              return done(churchSaveErr);
            }

            // Delete an existing Church
            agent.delete('/api/churches/' + churchSaveRes.body._id)
              .send(church)
              .expect(200)
              .end(function (churchDeleteErr, churchDeleteRes) {
                // Handle church error error
                if (churchDeleteErr) {
                  return done(churchDeleteErr);
                }

                // Set assertions
                (churchDeleteRes.body._id).should.equal(churchSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Church if not signed in', function (done) {
    // Set Church user
    church.user = user;

    // Create new Church model instance
    var churchObj = new Church(church);

    // Save the Church
    churchObj.save(function () {
      // Try deleting Church
      request(app).delete('/api/churches/' + churchObj._id)
        .expect(403)
        .end(function (churchDeleteErr, churchDeleteRes) {
          // Set message assertion
          (churchDeleteRes.body.message).should.match('User is not authorized');

          // Handle Church error error
          done(churchDeleteErr);
        });

    });
  });

  it('should be able to get a single Church that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Church
          agent.post('/api/churches')
            .send(church)
            .expect(200)
            .end(function (churchSaveErr, churchSaveRes) {
              // Handle Church save error
              if (churchSaveErr) {
                return done(churchSaveErr);
              }

              // Set assertions on new Church
              (churchSaveRes.body.name).should.equal(church.name);
              should.exist(churchSaveRes.body.user);
              should.equal(churchSaveRes.body.user._id, orphanId);

              // force the Church to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Church
                    agent.get('/api/churches/' + churchSaveRes.body._id)
                      .expect(200)
                      .end(function (churchInfoErr, churchInfoRes) {
                        // Handle Church error
                        if (churchInfoErr) {
                          return done(churchInfoErr);
                        }

                        // Set assertions
                        (churchInfoRes.body._id).should.equal(churchSaveRes.body._id);
                        (churchInfoRes.body.name).should.equal(church.name);
                        should.equal(churchInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Church.remove().exec(done);
    });
  });
});
