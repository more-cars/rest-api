import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›is-successor-of‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        const partner = await seedNode(NodeTypeEnum.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.id,
            partner.id,
            RelationshipType.CarModelIsSuccessorOf,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', partner.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.CarModelIsSuccessorOf)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.id,
            -42,
            RelationshipType.CarModelIsSuccessorOf,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
