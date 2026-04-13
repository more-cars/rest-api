import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const video = await seedNode(DbNodeType.Video)

    await expect(Programme.createHasMainVideoRelationship(programme.properties.id, video.properties.id))
        .rejects
        .toThrow(Error)
})
