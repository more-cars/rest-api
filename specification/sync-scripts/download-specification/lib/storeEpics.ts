import fs from "fs"
import type {Epic} from "./types/Epic"
import type {ReferenceTicket} from "./types/ReferenceTicket"
import {findReferenceTicket} from "./findReferenceTicket"
import filenamify from 'filenamify'

export function storeEpics(data: Array<Epic>, referenceTickets: Array<ReferenceTicket> = [], basepath: string = __dirname + '/../../../Behavior/') {
    const processedTickets: Array<ReferenceTicket> = []

    data.forEach(epic => {
        const parentSubPath = findReferenceTicket('', referenceTickets)?.sub_path ?? ''
        const subPath = parentSubPath + epic.id + ' » ' + filenamify(epic.title) + '/'
        const folderName = basepath + subPath
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + fileName, JSON.stringify(epic, null, 2) + "\n")

        processedTickets.push({
            type: 'epic',
            id: epic.id,
            sub_path: subPath,
            data: epic,
        })
    })

    return processedTickets
}
