var socket = io()

socket.on('getLatestTickets', function(data) {
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    for (i = 0; i < data.latestTickets.length; i++) {
        $('#lblTicket' + (i + 1)).text('Ticket N° ' + data.latestTickets[i].ticketNumber)
        $('#lblWorkstation' + (i + 1)).text('Worstation N° ' + data.latestTickets[i].workstation)
    }
})