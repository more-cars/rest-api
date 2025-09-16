import fs from "fs"
import type {Story} from "./types/Story"
import type {ReferenceTicket} from "./types/ReferenceTicket"
import {getParentTicket} from "./getParentTicket"

export function storeStories(data: Array<Story>, referenceTickets: Array<ReferenceTicket> = [], basepath: string = __dirname + '/../../../Behavior') {
    const processedTickets: Array<ReferenceTicket> = []

    data.forEach(story => {
        const subPath = getParentTicket(referenceTickets, story.parent_id).sub_path + story.id + ' » ' + story.title + '/'
        const folderName = basepath + subPath
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + fileName, JSON.stringify(story, null, 2) + "\n")

        processedTickets.push({
            type: 'story',
            id: story.id,
            sub_path: subPath
        })
    })

    return processedTickets
}
