import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GamingPlatform)
        const image = await seedNode(ControllerNodeType.Image)

        const createdRelationship = await createRelationship(
            gamingPlatform.properties.id,
            image.properties.id,
            RelationshipType.GamingPlatformHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', gamingPlatform.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.GamingPlatformHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GamingPlatform)

        const createdRelationship = await createRelationship(
            gamingPlatform.properties.id,
            -42,
            RelationshipType.GamingPlatformHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
