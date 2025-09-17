import fs from "fs"
import {describe, expect, test} from "vitest"
import type {
    AcceptanceCriterion
} from "../../../specification/sync-scripts/download-specification/lib/types/AcceptanceCriterion"
import {
    storeAcceptanceCriteria
} from "../../../specification/sync-scripts/download-specification/lib/storeAcceptanceCriteria"
import type {
    ReferenceTicket
} from "../../../specification/sync-scripts/download-specification/lib/types/ReferenceTicket"

describe('Storing the extracted ACs in the specification folder', () => {
    test('in custom location', async () => {
        const acs: Array<AcceptanceCriterion> = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/acceptance_criterion_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        const referenceTickets: Array<ReferenceTicket> = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/reference_tickets_acceptance_criteria.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        const randomSuffix = Math.floor(Math.random() * 100000)
        const storagePath = __dirname + '/_temp/Behavior_' + randomSuffix + '/'
        const ticketList = storeAcceptanceCriteria(acs, referenceTickets, storagePath)

        expect(ticketList.length)
            .toEqual(acs.length)

        acs.forEach(ac => {
            const filePath = storagePath + ac.id + ' » ' + ac.title + '/data.json'
            expect(fs.existsSync(filePath), `Did not find acceptance criteria specification at '${filePath}'.`)
                .toBeTruthy()
        })

        fs.rmSync(storagePath, {recursive: true})
        expect(fs.existsSync(storagePath))
            .toBeFalsy()
    })
})
