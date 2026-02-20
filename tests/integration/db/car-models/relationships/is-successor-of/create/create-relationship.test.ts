import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›is-successor-of‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
        const partner = await seedNode(ControllerNodeType.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.properties.id,
            partner.properties.id,
            RelationshipType.CarModelIsSuccessorOf,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModel.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', partner.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelIsSuccessorOf)
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
            RelationshipType.CarModelIsSuccessorOf,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
