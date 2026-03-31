import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {GamingPlatform} from "../../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A GAMING PLATFORM cannot have multiple ›has-main-video‹ relationships', async () => {
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await GamingPlatform.createHasMainVideoRelationship(gamingPlatform.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(gamingPlatform.properties.id, RelationshipType.GamingPlatformHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
