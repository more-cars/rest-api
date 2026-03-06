import {describe, expect, test} from 'vitest'
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›reviewed-car-model-variant-with-rating‹ relationship', () => {
    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(MagazineIssue.deleteReviewedCarModelVariantWithRatingRelationship(magazineIssue.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RATING node does not exist', async () => {
        const rating = await seedNode(DbNodeType.Rating)

        await expect(MagazineIssue.deleteReviewedCarModelVariantWithRatingRelationship(-42, rating.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node and RATING node do not exist', async () => {
        await expect(MagazineIssue.deleteReviewedCarModelVariantWithRatingRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›reviewed-car-model-variant-with-rating‹ relationship', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        const rating = await seedNode(DbNodeType.Rating)

        await expect(MagazineIssue.deleteReviewedCarModelVariantWithRatingRelationship(magazineIssue.properties.id, rating.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›reviewed-car-model-variant-with-rating‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MagazineIssue, DbNodeType.Rating, RelationshipType.MagazineIssueReviewedCarModelVariantWithRating)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueReviewedCarModelVariantWithRating,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await MagazineIssue.deleteReviewedCarModelVariantWithRatingRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueReviewedCarModelVariantWithRating,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
