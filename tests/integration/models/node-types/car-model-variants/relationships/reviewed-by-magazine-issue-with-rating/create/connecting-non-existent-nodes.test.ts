import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›reviewed-by-magazine-issue-with-rating‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const rating = await seedNode(DbNodeType.Rating)

    await expect(CarModelVariant.createReviewedByMagazineIssueWithRatingRelationship(-42, rating.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createReviewedByMagazineIssueWithRatingRelationship(carModelVariant.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createReviewedByMagazineIssueWithRatingRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
