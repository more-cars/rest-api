import fs from "fs"
import type {TicketType} from "./types/TicketType"

export function cacheJiraTickets(ticketType: TicketType, ticketCollection: Array<any>, path: string = './_temp') {
    cacheTickets("jira", ticketType, ticketCollection, path)
}

export function cacheXrayTickets(ticketType: TicketType, ticketCollection: Array<any>, path: string = './_temp') {
    cacheTickets("xray", ticketType, ticketCollection, path)
}

function cacheTickets(provider: 'jira' | 'xray', ticketType: TicketType, ticketCollection: Array<any>, path: string = './_temp') {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true})
    }

    fs.writeFileSync(path + '/' + provider + '_' + ticketType + '_collection.json', JSON.stringify(ticketCollection, null, 2))
}
