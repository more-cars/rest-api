import fs from "fs"
import type {Epic} from "./types/Epic"

export function storeEpics(data: Array<Epic>, basepath: string = __dirname + '/../../../Behavior') {
    data.forEach(epic => {
        const folderName = basepath + '/' + epic.id + ' » ' + epic.title
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(epic, null, 2) + "\n")
    })
}
