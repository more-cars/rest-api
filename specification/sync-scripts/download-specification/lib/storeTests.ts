import fs from "fs"
import type {Test} from "./types/Test"
import type {TicketListItem} from "./types/TicketListItem"

export function storeTests(data: Array<Test>, basepath: string = __dirname + '/../../../Behavior') {
    const ticketList: Array<TicketListItem> = []

    data.forEach(test => {
        const subPath = test.id + ' » ' + test.title
        const folderName = basepath + '/' + test.id + ' » ' + test.title
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(test, null, 2) + "\n")

        ticketList.push({
            type: 'test',
            id: test.id,
            sub_path: subPath
        })
    })

    return ticketList
}
