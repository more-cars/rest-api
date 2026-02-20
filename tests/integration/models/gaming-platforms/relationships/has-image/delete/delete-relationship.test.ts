import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('GAMING PLATFORM node does not exist', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)

        await expect(GamingPlatform.deleteHasImageRelationship(gamingPlatform.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(GamingPlatform.deleteHasImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('GAMING PLATFORM node and IMAGE node do not exist', async () => {
        await expect(GamingPlatform.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(GamingPlatform.deleteHasImageRelationship(gamingPlatform.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.GAMING_PLATFORM, ControllerNodeType.IMAGE, RelationshipType.GamingPlatformHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.GamingPlatformHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await GamingPlatform.deleteHasImageRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.GamingPlatformHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
