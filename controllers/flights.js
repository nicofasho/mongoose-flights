var Flight = require("../models/flight");
var Ticket = require("../models/ticket");

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  createDest
};

function createDest(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  Flight.findById(req.params.id, function(err, flight) {
    flight.destinations.push(req.body);
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`);
    });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    Ticket.find({ flight: flight._id }, function(err, tickets) {
      flight.destinations.sort(function(a, b) {
        return a.arrival - b.arrival;
      });
      var flightDestinations = [];
      flight.destinations.forEach(function(d) {
        flightDestinations.push(d.airport);
      });
      res.render("flights/show", {
        title: "Flight Details",
        flight,
        flightDestinations: flightDestinations,
        tickets
      });
    });
  });

  // iterate through flight destinations
  // add each airport code to a flightDestinations array
  // })
}

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render("flights/index", { flights, title: "All Flights" });
  });
}

function newFlight(req, res) {
  res.render("flights/new", { title: "Add a New Flight" });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  var flight = new Flight(req.body);
  flight.save(function(err) {
    if (err) return res.render("flights/new", { title: "Add a New Flight" });
    console.log(flight);
    res.redirect("/flights");
  });
}
