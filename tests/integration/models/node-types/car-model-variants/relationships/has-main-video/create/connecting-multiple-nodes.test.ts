import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT cannot have multiple ›has-main-video‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await CarModelVariant.createHasMainVideoRelationship(carModelVariant.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.properties.id, RelationshipType.CarModelVariantHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
