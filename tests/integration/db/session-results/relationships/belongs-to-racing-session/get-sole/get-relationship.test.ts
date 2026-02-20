import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting a ›belongs-to-racing-session‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(ControllerNodeType.SESSION_RESULT, ControllerNodeType.RACING_SESSION, RelationshipType.SessionResultBelongsToRacingSession)

        const relationships = await getRelationshipCollection(
            relationship.start_node.id,
            RelationshipType.SessionResultBelongsToRacingSession,
            NodeTypeLabel.RacingSession,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        const relationships = await getRelationshipCollection(
            sessionResult.id,
            RelationshipType.SessionResultBelongsToRacingSession,
            NodeTypeLabel.RacingSession,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.SessionResultBelongsToRacingSession,
            NodeTypeLabel.RacingSession,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
