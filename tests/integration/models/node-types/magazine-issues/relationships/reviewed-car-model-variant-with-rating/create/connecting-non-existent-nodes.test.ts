import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›reviewed-car-model-variant-with-rating‹ relationship with nodes that do not exist', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const rating = await seedNode(DbNodeType.Rating)

    await expect(MagazineIssue.createReviewedCarModelVariantWithRatingRelationship(-42, rating.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createReviewedCarModelVariantWithRatingRelationship(magazineIssue.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createReviewedCarModelVariantWithRatingRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
