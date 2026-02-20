import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›belongs-to-node‹ relationship', () => {
    test('with valid data', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

        const createdRelationship = await createRelationship(
            image.id,
            carModel.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ImageBelongsToNode)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            image.id,
            -42,
            RelationshipType.CompanyHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
