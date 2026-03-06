import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›reviewed-car-model-variant-with-rating‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MagazineIssue, DbNodeType.Rating, RelationshipType.MagazineIssueReviewedCarModelVariantWithRating)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueReviewedCarModelVariantWithRating,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueReviewedCarModelVariantWithRating,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueReviewedCarModelVariantWithRating,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        const rating = await seedNode(DbNodeType.Rating)

        const relationship = await deleteSpecificRelationship(
            magazineIssue.properties.id,
            rating.properties.id,
            RelationshipType.MagazineIssueReviewedCarModelVariantWithRating,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.MagazineIssueReviewedCarModelVariantWithRating,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
