import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›has-session-result‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
        await seedRelationshipForStartNode(racingSession.id, ControllerNodeType.SESSION_RESULT, RelationshipType.RacingSessionHasSessionResult)
        await seedRelationshipForStartNode(racingSession.id, ControllerNodeType.SESSION_RESULT, RelationshipType.RacingSessionHasSessionResult)

        const relationships = await getRelationshipCollection(
            racingSession.id,
            RelationshipType.RacingSessionHasSessionResult,
            NodeTypeLabel.SessionResult,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

        const relationships = await getRelationshipCollection(
            racingSession.id,
            RelationshipType.RacingSessionHasSessionResult,
            NodeTypeLabel.SessionResult,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingSessionHasSessionResult,
            NodeTypeLabel.SessionResult,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
