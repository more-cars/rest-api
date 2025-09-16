import fs from "fs"
import type {AcceptanceCriterion} from "./types/AcceptanceCriterion"
import type {TicketListItem} from "./types/TicketListItem"

export function storeAcceptanceCriteria(data: Array<AcceptanceCriterion>, basepath: string = __dirname + '/../../../Behavior') {
    const ticketList: Array<TicketListItem> = []

    data.forEach(ac => {
        const subPath = ac.id + ' » ' + ac.title
        const folderName = basepath + '/' + ac.id + ' » ' + ac.title
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(ac, null, 2) + "\n")

        ticketList.push({
            type: 'acceptance_criteria',
            id: ac.id,
            sub_path: subPath
        })
    })

    return ticketList
}
