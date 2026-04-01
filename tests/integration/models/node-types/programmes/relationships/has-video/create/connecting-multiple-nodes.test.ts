import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PROGRAMME can have multiple ›has-video‹ relationships', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await Programme.createHasVideoRelationship(programme.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(programme.properties.id, RelationshipType.ProgrammeHasVideo)

    expect(relationships.length)
        .toBe(videosAmount)
})
