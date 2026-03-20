import {describe, expect, test} from 'vitest'
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›for-car-model-variant‹ relationship', () => {
    test('PRICE node does not exist', async () => {
        const price = await seedNode(DbNodeType.Price)

        await expect(Price.deleteForCarModelVariantRelationship(price.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(Price.deleteForCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PRICE node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(Price.deleteForCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›for-car-model-variant‹ relationship', async () => {
        const price = await seedNode(DbNodeType.Price)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(Price.deleteForCarModelVariantRelationship(price.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›for-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Price, DbNodeType.CarModelVariant, RelationshipType.PriceForCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.PriceForCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Price.deleteForCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.PriceForCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
