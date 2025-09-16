import fs from "fs"
import {describe, expect, test} from "vitest"
import {storeStories} from "../../../specification/sync-scripts/download-specification/lib/storeStories"
import type {Story} from "../../../specification/sync-scripts/download-specification/lib/types/Story"
import type {
    ReferenceTicket
} from "../../../specification/sync-scripts/download-specification/lib/types/ReferenceTicket"

describe('Storing the extracted stories in the specification folder', () => {
    test('in custom location', async () => {
        const stories: Array<Story> = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/story_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        const referenceTickets: Array<ReferenceTicket> = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/reference_tickets_stories.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        const randomSuffix = Math.floor(Math.random() * 100000)
        const storagePath = __dirname + '/_temp/Behavior_' + randomSuffix
        const ticketList = storeStories(stories, referenceTickets, storagePath)

        expect(ticketList.length)
            .toEqual(stories.length)

        stories.forEach(story => {
            const filePath = storagePath + '/' + story.id + ' » ' + story.title + '/data.json'
            expect(fs.existsSync(filePath), `Did not find story specification at '${filePath}'.`)
                .toBeTruthy()
        })

        fs.rmSync(storagePath, {recursive: true})
        expect(fs.existsSync(storagePath))
            .toBeFalsy()
    })
})
