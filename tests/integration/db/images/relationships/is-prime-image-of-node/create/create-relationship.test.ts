import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›is-prime-image-of-node‹ relationship', () => {
    test('with valid data', async () => {
        const image = await seedNode(DbNodeType.Image)
        const node = await seedNode(DbNodeType.Company)

        const createdRelationship = await createRelationship(
            image.properties.id,
            node.properties.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', node.properties.id)
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
        const image = await seedNode(DbNodeType.Image)

        const createdRelationship = await createRelationship(
            -42,
            image.properties.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
