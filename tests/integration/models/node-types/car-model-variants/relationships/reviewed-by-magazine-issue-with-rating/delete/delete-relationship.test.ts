import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›reviewed-by-magazine-issue-with-rating‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(CarModelVariant.deleteReviewedByMagazineIssueWithRatingRelationship(carModelVariant.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RATING node does not exist', async () => {
        const rating = await seedNode(DbNodeType.Rating)

        await expect(CarModelVariant.deleteReviewedByMagazineIssueWithRatingRelationship(-42, rating.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and RATING node do not exist', async () => {
        await expect(CarModelVariant.deleteReviewedByMagazineIssueWithRatingRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›reviewed-by-magazine-issue-with-rating‹ relationship', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const rating = await seedNode(DbNodeType.Rating)

        await expect(CarModelVariant.deleteReviewedByMagazineIssueWithRatingRelationship(carModelVariant.properties.id, rating.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›reviewed-by-magazine-issue-with-rating‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModelVariant, DbNodeType.Rating, RelationshipType.CarModelVariantReviewedByMagazineIssueWithRating)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantReviewedByMagazineIssueWithRating,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteReviewedByMagazineIssueWithRatingRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantReviewedByMagazineIssueWithRating,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
