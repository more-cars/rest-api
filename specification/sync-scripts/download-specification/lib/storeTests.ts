import fs from "fs"
import type {Test} from "./types/Test"
import type {ReferenceTicket} from "./types/ReferenceTicket"
import {findReferenceTicket} from "./findReferenceTicket"
import filenamify from "filenamify"

export function storeTests(data: Array<Test>, referenceTickets: Array<ReferenceTicket> = [], basepath: string = __dirname + '/../../../Behavior/') {
    const processedTickets: Array<ReferenceTicket> = []

    data.forEach(test => {
        const parentSubPath = findReferenceTicket(test.parent_id, referenceTickets)?.sub_path ?? ''
        const subPath = parentSubPath + test.id + ' » ' + filenamify(test.title) + '/'
        const folderName = basepath + subPath
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + fileName, JSON.stringify(test, null, 2) + "\n")

        processedTickets.push({
            type: 'test',
            id: test.id,
            sub_path: subPath,
            data: test,
        })
    })

    return processedTickets
}
