import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›belongs-to-node‹ relationship', () => {
    test('with valid data', async () => {
        const video = await seedNode(DbNodeType.Video)
        const node = await seedNode(DbNodeType.Node)

        const createdRelationship = await createRelationship(
            video.properties.id,
            node.properties.id,
            RelationshipType.VideoBelongsToNode,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.VideoBelongsToNode)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', video.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', node.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const video = await seedNode(DbNodeType.Video)

        const createdRelationship = await createRelationship(
            video.properties.id,
            -42,
            RelationshipType.VideoBelongsToNode,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
