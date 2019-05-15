var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
      var c = new Date(year + 1, month, day);
      return c;
    }
  }
});

module.exports = mongoose.model('Flight', flightSchema);