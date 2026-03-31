import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MODEL CAR BRAND cannot have multiple ›has-main-video‹ relationships', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await ModelCarBrand.createHasMainVideoRelationship(modelCarBrand.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(modelCarBrand.properties.id, RelationshipType.ModelCarBrandHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
