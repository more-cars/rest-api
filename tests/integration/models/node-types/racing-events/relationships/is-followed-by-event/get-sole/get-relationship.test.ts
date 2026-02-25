import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›is-followed-by-event‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.RacingEvent, DbNodeType.RacingEvent, RelationshipType.RacingEventIsFollowedByEvent)
        const expectedRacingEventId = expectedRelationship.start_node.properties.id
        const expectedSuccessorId = expectedRelationship.end_node.properties.id
        const actualRelationship = await RacingEvent.getIsFollowedByEventRelationship(expectedRacingEventId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedRacingEventId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedSuccessorId)
    })

    test('node exists, but not the relationship', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingEvent.getIsFollowedByEventRelationship(racingEvent.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(RacingEvent.getIsFollowedByEventRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
