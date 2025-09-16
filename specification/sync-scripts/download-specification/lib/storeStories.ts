import fs from "fs"
import type {Story} from "./types/Story"
import type {TicketListItem} from "./types/TicketListItem"

export function storeStories(data: Array<Story>, basepath: string = __dirname + '/../../../Behavior') {
    const ticketList: Array<TicketListItem> = []

    data.forEach(story => {
        const subPath = story.id + ' » ' + story.title
        const folderName = basepath + '/' + subPath
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(story, null, 2) + "\n")

        ticketList.push({
            type: 'story',
            id: story.id,
            sub_path: subPath
        })
    })

    return ticketList
}
