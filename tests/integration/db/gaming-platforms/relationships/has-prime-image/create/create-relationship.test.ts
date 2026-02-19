import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            gamingPlatform.id,
            image.id,
            RelationshipType.GamingPlatformHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', gamingPlatform.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.GamingPlatformHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

        const createdRelationship = await createRelationship(
            gamingPlatform.id,
            -42,
            RelationshipType.GamingPlatformHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
