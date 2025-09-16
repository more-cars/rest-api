import fs from "fs"

export function cacheJiraTickets(ticketType: 'epic' | 'story' | 'acceptance_criteria' | 'test', ticketCollection: Array<any>, path: string = './_temp') {
    cacheTickets("jira", ticketType, ticketCollection, path)
}

export function cacheXrayTickets(ticketType: 'epic' | 'story' | 'acceptance_criteria' | 'test', ticketCollection: Array<any>, path: string = './_temp') {
    cacheTickets("xray", ticketType, ticketCollection, path)
}

function cacheTickets(provider: 'jira' | 'xray', ticketType: 'epic' | 'story' | 'acceptance_criteria' | 'test', ticketCollection: Array<any>, path: string = './_temp') {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true})
    }

    fs.writeFileSync(path + '/' + provider + '_' + ticketType + '_collection.json', JSON.stringify(ticketCollection, null, 2))
}
