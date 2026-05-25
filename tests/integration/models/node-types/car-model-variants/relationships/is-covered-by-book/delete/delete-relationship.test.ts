import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-covered-by-book‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(CarModelVariant.deleteIsCoveredByBookRelationship(carModelVariant.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BOOK node does not exist', async () => {
        const book = await seedNode(DbNodeType.Book)

        await expect(CarModelVariant.deleteIsCoveredByBookRelationship(-42, book.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and BOOK node do not exist', async () => {
        await expect(CarModelVariant.deleteIsCoveredByBookRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-covered-by-book‹ relationship', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const book = await seedNode(DbNodeType.Book)

        await expect(CarModelVariant.deleteIsCoveredByBookRelationship(carModelVariant.properties.id, book.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-covered-by-book‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModelVariant, DbNodeType.Book, RelationshipType.CarModelVariantIsCoveredByBook)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantIsCoveredByBook,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteIsCoveredByBookRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantIsCoveredByBook,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
