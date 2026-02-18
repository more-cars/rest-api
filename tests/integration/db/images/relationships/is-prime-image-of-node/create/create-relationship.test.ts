import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›is-prime-image-of-node‹ relationship', () => {
    test('with valid data', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)
        const node = await seedNode(NodeTypeEnum.COMPANY)

        const createdRelationship = await createRelationship(
            image.id,
            node.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', node.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.ImageIsPrimeImageOfNode)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            -42,
            image.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
