import fs from "fs"
import type {AcceptanceCriterion} from "./types/AcceptanceCriterion"

export function storeAcceptanceCriteria(data: Array<AcceptanceCriterion>, basepath: string = __dirname + '/../../../Behavior') {
    data.forEach(ac => {
        const folderName = basepath + '/' + ac.id + ' » ' + ac.title
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(ac, null, 2) + "\n")
    })
}
