import fs from "fs"
import type {Epic} from "./types/Epic"
import type {TicketListItem} from "./types/TicketListItem"

export function storeEpics(data: Array<Epic>, basepath: string = __dirname + '/../../../Behavior') {
    const ticketList: Array<TicketListItem> = []

    data.forEach(epic => {
        const subPath = epic.id + ' » ' + epic.title
        const folderName = basepath + '/' + subPath
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(epic, null, 2) + "\n")

        ticketList.push({
            type: 'epic',
            id: epic.id,
            sub_path: subPath
        })
    })
    console.log(ticketList)
    return ticketList
}
