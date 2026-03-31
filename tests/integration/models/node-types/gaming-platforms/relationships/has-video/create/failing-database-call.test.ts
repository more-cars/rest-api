import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {GamingPlatform} from "../../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
    const video = await seedNode(DbNodeType.Video)

    await expect(GamingPlatform.createHasVideoRelationship(gamingPlatform.properties.id, video.properties.id))
        .rejects
        .toThrow(Error)
})
