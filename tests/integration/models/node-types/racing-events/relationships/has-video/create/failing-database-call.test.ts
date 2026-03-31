import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const video = await seedNode(DbNodeType.Video)

    await expect(RacingEvent.createHasVideoRelationship(racingEvent.properties.id, video.properties.id))
        .rejects
        .toThrow(Error)
})
