const { io } = require('../server')
const { TicketController } = require('../classes/ticket-controller')

const ticketController = new TicketController()

io.on('connection', (client) => {
    console.log('User connected');

    client.on('nextTicketNumber', (data, callback) => {
        callback(ticketController.nextTicketNumber())

        client.broadcast.emit('getLastTickerNumber', {
            currentTicketNumber: ticketController.getLastTickerNumber()
        })
    })

    client.on('serveTicket', (data, callback) => {
        if (!data.workstation) {
            callback({
                err: true,
                message: 'The workstation is required'
            })
        }

        let serveTicket = ticketController.serveTicket(data.workstation)
        if (serveTicket.ok) {
            client.broadcast.emit('getLatestTickets', {
                currentTicketNumber: ticketController.getLastTickerNumber(),
                latestTickets: ticketController.getLatestTickers()
            })
        }
        callback(serveTicket)
    })

    client.emit('getLastTickerNumber', {
        currentTicketNumber: ticketController.getLastTickerNumber()
    })

    client.emit('getLatestTickets', {
        latestTickets: ticketController.getLatestTickers()
    })

})