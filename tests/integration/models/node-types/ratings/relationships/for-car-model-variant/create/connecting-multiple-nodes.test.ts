import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RATING cannot have multiple ›for-car-model-variant‹ relationships', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await Rating.createForCarModelVariantRelationship(rating.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(rating.properties.id, RelationshipType.RatingForCarModelVariant)

    expect(relationships.length)
        .toBe(1)
})
