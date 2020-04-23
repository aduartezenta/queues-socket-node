var socket = io()
var labelTicketNumber = $('#labelTicketNumber')

socket.on('connect', function() {
    console.log('Connected');
})

socket.on('disconnect', function() {
    console.log('Disconnected');
})

socket.on('getLastTickerNumber', function(res) {
    labelTicketNumber.text(res.currentTicketNumber)
})

$('button').on('click', function() {
    socket.emit('nextTicketNumber', null, function(res) {
        labelTicketNumber.text(res)
    })
})