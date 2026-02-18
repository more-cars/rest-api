import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(SessionResult.deleteHasImageRelationship(sessionResult.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(SessionResult.deleteHasImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node and IMAGE node do not exist', async () => {
        await expect(SessionResult.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(SessionResult.deleteHasImageRelationship(sessionResult.id, image.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.SESSION_RESULT, NodeTypeEnum.IMAGE, RelationshipType.SessionResultHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.SessionResultHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await SessionResult.deleteHasImageRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.SessionResultHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
