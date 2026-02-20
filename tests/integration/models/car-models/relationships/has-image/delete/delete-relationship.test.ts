import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"

describe('Deleting a ›has-image‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

        await expect(CarModel.deleteHasImageRelationship(carModel.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(CarModel.deleteHasImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and IMAGE node do not exist', async () => {
        await expect(CarModel.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(CarModel.deleteHasImageRelationship(carModel.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.CAR_MODEL, ControllerNodeType.IMAGE, RelationshipType.CarModelHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
