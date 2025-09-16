import fs from "fs"
import type {AcceptanceCriterion} from "./types/AcceptanceCriterion"
import type {ReferenceTicket} from "./types/ReferenceTicket"
import {getParentTicket} from "./getParentTicket"

export function storeAcceptanceCriteria(data: Array<AcceptanceCriterion>, referenceTickets: Array<ReferenceTicket> = [], basepath: string = __dirname + '/../../../Behavior') {
    const processedTickets: Array<ReferenceTicket> = []

    data.forEach(ac => {
        const subPath = getParentTicket(referenceTickets, ac.parent_id).sub_path + ac.id + ' » ' + ac.title + '/'
        const folderName = basepath + subPath
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + fileName, JSON.stringify(ac, null, 2) + "\n")

        processedTickets.push({
            type: 'acceptance_criteria',
            id: ac.id,
            sub_path: subPath
        })
    })

    return processedTickets
}
