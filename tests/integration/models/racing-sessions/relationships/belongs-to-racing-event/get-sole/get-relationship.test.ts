import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›belongs-to-racing-event‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.RACING_SESSION, ControllerNodeType.RACING_EVENT, RelationshipType.RacingSessionBelongsToRacingEvent)
        const expectedRacingSessionId = expectedRelationship.start_node.id
        const expectedRacingEventId = expectedRelationship.end_node.id
        const actualRelationship = await RacingSession.getBelongsToRacingEventRelationship(expectedRacingSessionId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedRacingSessionId)

        expect(actualRelationship.destination.id)
            .toBe(expectedRacingEventId)
    })

    test('node exists, but not the relationship', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

        await expect(RacingSession.getBelongsToRacingEventRelationship(racingSession.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(RacingSession.getBelongsToRacingEventRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
