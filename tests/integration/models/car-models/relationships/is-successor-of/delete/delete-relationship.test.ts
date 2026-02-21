import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a ›is-successor-of‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(ControllerNodeType.CarModel)

        await expect(CarModel.deleteIsSuccessorOfRelationship(carModel.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode(ControllerNodeType.CarModel)

        await expect(CarModel.deleteIsSuccessorOfRelationship(-42, partner.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and PARTNER node do not exist', async () => {
        await expect(CarModel.deleteIsSuccessorOfRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-successor-of‹ relationship', async () => {
        const carModel = await seedNode(ControllerNodeType.CarModel)
        const partner = await seedNode(ControllerNodeType.CarModel)

        await expect(CarModel.deleteIsSuccessorOfRelationship(carModel.properties.id, partner.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-successor-of‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.CarModel, ControllerNodeType.CarModel, RelationshipType.CarModelIsSuccessorOf)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelIsSuccessorOf,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteIsSuccessorOfRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelIsSuccessorOf,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
