import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const video = await seedNode(DbNodeType.Video)

    await expect(RacingSession.createHasMainVideoRelationship(racingSession.properties.id, video.properties.id))
        .rejects
        .toThrow(Error)
})
