import fs from "fs"
import {describe, expect, test} from "vitest"
import type {Test} from "../../../specification/sync-scripts/download-specification/lib/types/Test"
import {storeTests} from "../../../specification/sync-scripts/download-specification/lib/storeTests"

describe('Storing the extracted tests in the specification folder', () => {
    test('in custom location', async () => {
        const tests: Array<Test> = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/test_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        const randomSuffix = Math.floor(Math.random() * 100000)
        const storagePath = __dirname + '/_temp/Behavior_' + randomSuffix
        const ticketList = storeTests(tests, storagePath)

        expect(ticketList.length)
            .toEqual(tests.length)

        tests.forEach(test => {
            const filePath = storagePath + '/' + test.id + ' » ' + test.title + '/data.json'
            expect(fs.existsSync(filePath), `Did not find test specification at '${filePath}'.`)
                .toBeTruthy()
        })

        fs.rmSync(storagePath, {recursive: true})
        expect(fs.existsSync(storagePath))
            .toBeFalsy()
    })
})
