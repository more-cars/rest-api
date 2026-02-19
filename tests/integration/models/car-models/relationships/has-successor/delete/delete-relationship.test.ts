import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Deleting a ›has-successor‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        await expect(CarModel.deleteHasSuccessorRelationship(carModel.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode(NodeTypeEnum.CAR_MODEL)

        await expect(CarModel.deleteHasSuccessorRelationship(-42, partner.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and PARTNER node do not exist', async () => {
        await expect(CarModel.deleteHasSuccessorRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-successor‹ relationship', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        const partner = await seedNode(NodeTypeEnum.CAR_MODEL)

        await expect(CarModel.deleteHasSuccessorRelationship(carModel.id, partner.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-successor‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.CAR_MODEL, RelationshipType.CarModelHasSuccessor)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.CarModelHasSuccessor,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteHasSuccessorRelationship(seededRelationship.start_node.id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.CarModelHasSuccessor,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
