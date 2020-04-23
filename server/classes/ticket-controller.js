const fs = require('fs')

class Ticket {

    constructor(ticketNumber, workstation) {
        this.ticketNumber = ticketNumber
        this.workstation = workstation
    }

}

class TicketController {

    constructor() {
        this.lastTickerNumber = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.latestTickets = []
        const data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastTickerNumber = data.lastTickerNumber
            this.tickets = data.tickets
            this.latestTickets = data.latestTickets
        } else {
            this.writeFile()
        }
        console.log('System started');
    }

    nextTicketNumber() {
        this.lastTickerNumber += 1
        let ticket = new Ticket(this.lastTickerNumber, null)
        this.tickets.push(ticket)
        this.writeFile()

        return this.lastTickerNumber
    }

    getLastTickerNumber() {
        return this.lastTickerNumber
    }

    getLatestTickers() {
        return this.latestTickets
    }

    serveTicket(workstation) {
        if (this.tickets.length === 0) {
            return {
                ok: false,
                err: {
                    message: 'No tickets found'
                }
            }
        }

        // Gets ticket number and removes from tickets list
        let ticketNumber = this.tickets[0].ticketNumber
        this.tickets.shift()

        // Creates new ticket and adds it at first position
        let ticket = new Ticket(ticketNumber, workstation)
        this.latestTickets.unshift(ticket)

        // Remove the last element of array if size is bigger than 4
        if (this.latestTickets.length > 4) {
            this.latestTickets.splice(-1, 1)
        }
        this.writeFile()

        console.log(this.latestTickets);

        return {
            ok: true,
            ticketNumber
        }
    }

    writeFile() {
        let data = {
            'lastTickerNumber': this.lastTickerNumber,
            'today': this.today,
            'tickets': this.tickets,
            'latestTickets': this.latestTickets
        }
        let json = JSON.stringify(data)
        fs.writeFileSync('./server/data/data.json', json)
    }
}


module.exports = {
    TicketController
}