import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-variant‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(ControllerNodeType.CarModel)

        await expect(CarModel.deleteHasVariantRelationship(carModel.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

        await expect(CarModel.deleteHasVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(CarModel.deleteHasVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-variant‹ relationship', async () => {
        const carModel = await seedNode(ControllerNodeType.CarModel)
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

        await expect(CarModel.deleteHasVariantRelationship(carModel.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.CarModel, ControllerNodeType.CarModelVariant, RelationshipType.CarModelHasVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelHasVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteHasVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelHasVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
