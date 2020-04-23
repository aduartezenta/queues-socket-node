var socket = io()

var searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('workstation')) {
    window.location = 'index.html'
    throw new Error('The workstation is required')
}

var workstation = searchParams.get('workstation')

$('#title').text("Workstation " + workstation)

$('#serveTicket').on('click', function() {
    socket.emit('serveTicket', {
        workstation: workstation
    }, function(res) {
        if (res.ok) {
            $('#ticket').text('Ticket N° ' + res.ticketNumber)
        } else {
            alert(res.err.message)
        }
    })
})