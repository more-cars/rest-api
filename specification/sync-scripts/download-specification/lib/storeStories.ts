import fs from "fs"
import type {Story} from "./types/Story"

export function storeStories(data: Array<Story>, basepath: string = __dirname + '/../../../Behavior') {
    data.forEach(story => {
        const folderName = basepath + '/' + story.id + ' » ' + story.title
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(story, null, 2) + "\n")
    })
}
