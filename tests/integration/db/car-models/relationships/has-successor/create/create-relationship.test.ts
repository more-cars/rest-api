import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-successor‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
        const partnerNode = await seedNode(ControllerNodeType.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.properties.id,
            partnerNode.properties.id,
            RelationshipType.CarModelHasSuccessor,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModel.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', partnerNode.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelHasSuccessor)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.properties.id,
            -42,
            RelationshipType.CarModelHasSuccessor,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
