import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›is-prime-image-of-node‹ relationship', () => {
    test('with valid data', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)
        const node = await seedNode(ControllerNodeType.COMPANY)

        const createdRelationship = await createRelationship(
            image.id,
            node.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', node.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ImageIsPrimeImageOfNode)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            -42,
            image.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
