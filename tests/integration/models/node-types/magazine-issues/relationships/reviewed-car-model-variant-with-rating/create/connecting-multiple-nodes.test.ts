import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE ISSUE can have multiple ›reviewed-car-model-variant-with-rating‹ relationships', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const ratingsAmount = 3
    const ratings = await seedNodes(DbNodeType.Rating, ratingsAmount)

    for (const rating of ratings) {
        await MagazineIssue.createReviewedCarModelVariantWithRatingRelationship(magazineIssue.properties.id, rating.properties.id)
    }

    const relationships = await getRelationshipCollection(magazineIssue.properties.id, RelationshipType.MagazineIssueReviewedCarModelVariantWithRating)

    expect(relationships.length)
        .toBe(ratingsAmount)
})
