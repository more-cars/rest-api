import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting all ›has-session-result‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
        await seedRelationshipForStartNode(racingSession.id, NodeTypeEnum.SESSION_RESULT, DbRelationship.RacingSessionHasSessionResult)
        await seedRelationshipForStartNode(racingSession.id, NodeTypeEnum.SESSION_RESULT, DbRelationship.RacingSessionHasSessionResult)

        const relationships = await getRelationshipsForSpecificNode(
            racingSession.id,
            DbRelationship.RacingSessionHasSessionResult,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        const relationships = await getRelationshipsForSpecificNode(
            racingSession.id,
            DbRelationship.RacingSessionHasSessionResult,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.RacingSessionHasSessionResult,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
