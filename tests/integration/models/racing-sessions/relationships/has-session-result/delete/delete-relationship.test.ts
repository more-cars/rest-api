import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-session-result‹ relationship', () => {
    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(ControllerNodeType.RacingSession)

        await expect(RacingSession.deleteHasSessionResultRelationship(racingSession.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SessionResult)

        await expect(RacingSession.deleteHasSessionResultRelationship(-42, sessionResult.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node and SESSION RESULT node do not exist', async () => {
        await expect(RacingSession.deleteHasSessionResultRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-session-result‹ relationship', async () => {
        const racingSession = await seedNode(ControllerNodeType.RacingSession)
        const sessionResult = await seedNode(ControllerNodeType.SessionResult)

        await expect(RacingSession.deleteHasSessionResultRelationship(racingSession.properties.id, sessionResult.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-session-result‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RacingSession, ControllerNodeType.SessionResult, RelationshipType.RacingSessionHasSessionResult)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSessionHasSessionResult,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSession.deleteHasSessionResultRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSessionHasSessionResult,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
