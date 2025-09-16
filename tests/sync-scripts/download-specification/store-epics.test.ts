import fs from "fs"
import {describe, expect, test} from "vitest"
import {storeEpics} from "../../../specification/sync-scripts/download-specification/lib/storeEpics"
import type {Epic} from "../../../specification/sync-scripts/download-specification/lib/types/Epic"
import type {
    ReferenceTicket
} from "../../../specification/sync-scripts/download-specification/lib/types/ReferenceTicket"

describe('Storing the extracted epics in the specification folder', () => {
    test('in custom location', async () => {
        const epics: Array<Epic> = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/epic_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        const referenceTickets: Array<ReferenceTicket> = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/reference_tickets_epics.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        const randomSuffix = Math.floor(Math.random() * 100000)
        const storagePath = __dirname + '/_temp/Behavior_' + randomSuffix
        const ticketList = storeEpics(epics, referenceTickets, storagePath)

        expect(ticketList.length)
            .toEqual(epics.length)

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
