import {describe, expect, test} from 'vitest'
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›for-car-model-variant‹ relationship', () => {
    test('RATING node does not exist', async () => {
        const rating = await seedNode(DbNodeType.Rating)

        await expect(Rating.deleteForCarModelVariantRelationship(rating.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(Rating.deleteForCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RATING node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(Rating.deleteForCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›for-car-model-variant‹ relationship', async () => {
        const rating = await seedNode(DbNodeType.Rating)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(Rating.deleteForCarModelVariantRelationship(rating.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›for-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Rating, DbNodeType.CarModelVariant, RelationshipType.RatingForCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RatingForCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Rating.deleteForCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RatingForCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
