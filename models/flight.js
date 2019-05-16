var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SEA']
  },
  arrival: {
    type: Date,
    default: function() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var hour = d.getHours();
      var min = d.getMinutes();
      c = new Date(year + 2, month, day + 1, hour, min);
      return c;
    }
  }
})

var flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United', 'n/a']
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: function() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var hour = d.getHours();
      var min = d.getMinutes();
      var c = new Date(year + 1, month, day, hour, min);
      return c;
    }
  },
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SEA']
  },
  destinations: [destinationSchema]
});

module.exports = mongoose.model('Flight', flightSchema);