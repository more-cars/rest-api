import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›is-successor-of‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode('car model')

        await expect(CarModel.deleteIsSuccessorOfRelationship(carModel.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode('car model')

        await expect(CarModel.deleteIsSuccessorOfRelationship(-42, partner.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and PARTNER node do not exist', async () => {
        await expect(CarModel.deleteIsSuccessorOfRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-successor-of‹ relationship', async () => {
        const carModel = await seedNode('car model')
        const partner = await seedNode('car model')

        await expect(CarModel.deleteIsSuccessorOfRelationship(carModel.id, partner.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›is-successor-of‹ relationship', async () => {
        const seededRelationship = await seedRelationship('car model', 'car model', DbRelationship.CarModelIsSuccessorOf)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteIsSuccessorOfRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
