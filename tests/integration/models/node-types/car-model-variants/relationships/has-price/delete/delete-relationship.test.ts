import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-price‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(CarModelVariant.deleteHasPriceRelationship(carModelVariant.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PRICE node does not exist', async () => {
        const price = await seedNode(DbNodeType.Price)

        await expect(CarModelVariant.deleteHasPriceRelationship(-42, price.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and PRICE node do not exist', async () => {
        await expect(CarModelVariant.deleteHasPriceRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-price‹ relationship', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const price = await seedNode(DbNodeType.Price)

        await expect(CarModelVariant.deleteHasPriceRelationship(carModelVariant.properties.id, price.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-price‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModelVariant, DbNodeType.Price, RelationshipType.CarModelVariantHasPrice)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantHasPrice,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteHasPriceRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantHasPrice,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
