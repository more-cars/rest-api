import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›reviewed-by-magazine-issue-with-rating‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const rating = await seedNode(DbNodeType.Rating)

    await expect(CarModelVariant.createReviewedByMagazineIssueWithRatingRelationship(carModelVariant.properties.id, rating.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createReviewedByMagazineIssueWithRatingRelationship(carModelVariant.properties.id, rating.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
