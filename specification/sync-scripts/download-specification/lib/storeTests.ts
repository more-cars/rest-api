import fs from "fs"
import type {Test} from "./types/Test"

export function storeTests(data: Array<Test>, basepath: string = __dirname + '/../../../Behavior') {
    data.forEach(test => {
        const folderName = basepath + '/' + test.id + ' » ' + test.title
        const fileName = 'data.json'

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, {recursive: true})
        }

        fs.writeFileSync(folderName + '/' + fileName, JSON.stringify(test, null, 2) + "\n")
    })
}
