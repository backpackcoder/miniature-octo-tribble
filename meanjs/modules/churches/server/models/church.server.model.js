'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Church Schema
 */
var ChurchSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill church name',
    trim: true
  },
  lat: {
    type: Number,
    default: 0,
    required: 'Please fill church latitude'
  },
  lng: {
    type: Number,
    default: 0,
    required: 'Please fill church longitude'
  }
});

mongoose.model('Church', ChurchSchema);
