import fs from "fs"
import type {Test} from "./types/Test"
import type {ReferenceTicket} from "./types/ReferenceTicket"
import {getParentTicket} from "./getParentTicket"

export function storeTests(data: Array<Test>, referenceTickets: Array<ReferenceTicket> = [], basepath: string = __dirname + '/../../../Behavior') {
    const processedTickets: Array<ReferenceTicket> = []

    data.forEach(test => {
        const subPath = getParentTicket(referenceTickets, test.parent_id).sub_path + test.id + ' » ' + test.title + '/'
        const folderName = basepath + subPath
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + fileName, JSON.stringify(test, null, 2) + "\n")

        processedTickets.push({
            type: 'test',
            id: test.id,
            sub_path: subPath
        })
    })

    return processedTickets
}
