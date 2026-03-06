import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›reviewed-car-model-variant-with-rating‹ relationship again', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const rating = await seedNode(DbNodeType.Rating)

    await expect(MagazineIssue.createReviewedCarModelVariantWithRatingRelationship(magazineIssue.properties.id, rating.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MagazineIssue.createReviewedCarModelVariantWithRatingRelationship(magazineIssue.properties.id, rating.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
