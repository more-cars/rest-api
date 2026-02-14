import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {REL, seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›is-followed-by-event‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.RACING_EVENT, NodeTypeEnum.RACING_EVENT, DbRelationship.RacingEventIsFollowedByEvent, REL.REVERSE)
        const expectedRacingEventId = expectedRelationship.end_node_id
        const expectedSuccessorId = expectedRelationship.start_node_id
        const actualRelationship = await RacingEvent.getIsFollowedByEventRelationship(expectedRacingEventId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedRacingEventId)

        expect(actualRelationship.destination.id)
            .toBe(expectedSuccessorId)
    })

    test('node exists, but not the relationship', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(RacingEvent.getIsFollowedByEventRelationship(racingEvent.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(RacingEvent.getIsFollowedByEventRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
