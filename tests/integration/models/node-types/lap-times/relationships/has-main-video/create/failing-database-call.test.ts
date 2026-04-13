import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const video = await seedNode(DbNodeType.Video)

    await expect(LapTime.createHasMainVideoRelationship(lapTime.properties.id, video.properties.id))
        .rejects
        .toThrow(Error)
})
