import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT can have multiple ›reviewed-by-magazine-issue-with-rating‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const ratingsAmount = 3
    const ratings = await seedNodes(DbNodeType.Rating, ratingsAmount)

    for (const rating of ratings) {
        await CarModelVariant.createReviewedByMagazineIssueWithRatingRelationship(carModelVariant.properties.id, rating.properties.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.properties.id, RelationshipType.CarModelVariantReviewedByMagazineIssueWithRating)

    expect(relationships.length)
        .toBe(ratingsAmount)
})
