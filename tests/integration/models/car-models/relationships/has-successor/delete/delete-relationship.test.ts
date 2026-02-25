import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-successor‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        await expect(CarModel.deleteHasSuccessorRelationship(carModel.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode(DbNodeType.CarModel)

        await expect(CarModel.deleteHasSuccessorRelationship(-42, partner.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and PARTNER node do not exist', async () => {
        await expect(CarModel.deleteHasSuccessorRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-successor‹ relationship', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        const partner = await seedNode(DbNodeType.CarModel)

        await expect(CarModel.deleteHasSuccessorRelationship(carModel.properties.id, partner.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-successor‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.CarModel, RelationshipType.CarModelHasSuccessor)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelHasSuccessor,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteHasSuccessorRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelHasSuccessor,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
