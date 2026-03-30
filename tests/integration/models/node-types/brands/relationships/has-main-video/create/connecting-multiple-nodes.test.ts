import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A BRAND cannot have multiple ›has-main-video‹ relationships', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await Brand.createHasMainVideoRelationship(brand.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(brand.properties.id, RelationshipType.BrandHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
