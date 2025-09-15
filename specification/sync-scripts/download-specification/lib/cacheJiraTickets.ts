import fs from "fs"

export function cacheJiraTickets(ticketType: 'epic' | 'story' | 'acceptance_criteria' | 'test', ticketCollection: Array<any>, path: string = './_temp') {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true})
    }

    fs.writeFileSync(path + '/jira_' + ticketType + '_collection.json', JSON.stringify(ticketCollection, null, 2))
}
