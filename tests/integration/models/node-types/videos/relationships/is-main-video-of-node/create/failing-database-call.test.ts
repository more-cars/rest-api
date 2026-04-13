import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Video} from "../../../../../../../../src/models/node-types/videos/Video"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const video = await seedNode(DbNodeType.Video)
    const node = await seedNode(DbNodeType.Node)

    await expect(Video.createIsMainVideoOfNodeRelationship(video.properties.id, node.properties.id))
        .rejects
        .toThrow(Error)
})
