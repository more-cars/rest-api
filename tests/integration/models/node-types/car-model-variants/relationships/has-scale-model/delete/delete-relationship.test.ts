import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-scale-model‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(CarModelVariant.deleteHasScaleModelRelationship(carModelVariant.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR node does not exist', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(CarModelVariant.deleteHasScaleModelRelationship(-42, modelCar.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and MODEL CAR node do not exist', async () => {
        await expect(CarModelVariant.deleteHasScaleModelRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-scale-model‹ relationship', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(CarModelVariant.deleteHasScaleModelRelationship(carModelVariant.properties.id, modelCar.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-scale-model‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModelVariant, DbNodeType.ModelCar, RelationshipType.CarModelVariantHasScaleModel)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantHasScaleModel,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteHasScaleModelRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantHasScaleModel,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
