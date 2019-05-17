var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
}

function newTicket(req, res) {
    console.log(req.params);
    res.render('tickets/new', {title: 'Add a New Ticket', flight: req.params.id});
}

function create(req, res) {
    console.log(req.params);
    Flight.findById(req.params.id, function(err, flight) {
        let ticket = req.body;
        ticket.flight = flight._id;
        Ticket.create(ticket, function(err, ticket) {
            console.log(`saved ${ticket}`);
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

