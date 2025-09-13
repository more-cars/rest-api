import fs from "fs"
import {describe, expect, test} from "vitest"
import {storeEpics} from "../../../specification/sync-scripts/download-specification/lib/storeEpics"
import type {Epic} from "../../../specification/sync-scripts/download-specification/lib/types/Epic"

describe('Storing the extracted epics in the specification folder', () => {
    test('in custom location', async () => {
        const epics: Array<Epic> = JSON.parse(
            fs.readFileSync(__dirname + '/../../_toolbox/fixtures/specification/epic_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        const randomSuffix = Math.floor(Math.random() * 100000)
        const storagePath = __dirname + '/_temp/Behavior_' + randomSuffix
        storeEpics(epics, storagePath)

        epics.forEach(epic => {
            const filePath = storagePath + '/' + epic.id + ' » ' + epic.title + '/data.json'
            expect(fs.existsSync(filePath), `Did not find epic specification at '${filePath}'.`)
                .toBeTruthy()
        })

        fs.rmSync(storagePath, {recursive: true})
        expect(fs.existsSync(storagePath))
            .toBeFalsy()
    })
})
