import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSessionRelationship} from "../../../../../../../src/models/racing-sessions/types/RacingSessionRelationship"

describe('Creating a ›has-session-result‹ relationship', () => {
    test('with valid data', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        const createdRelationship = await createRelationship(
            racingSession.id,
            sessionResult.id,
            DbRelationship.RacingSessionHasSessionResult,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', racingSession.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', sessionResult.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RacingSessionRelationship.hasSessionResult)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        const createdRelationship = await createRelationship(
            racingSession.id,
            -42,
            DbRelationship.RacingSessionHasSessionResult,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
