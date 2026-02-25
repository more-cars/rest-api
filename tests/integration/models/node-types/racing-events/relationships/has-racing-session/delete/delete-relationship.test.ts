import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-racing-session‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingEvent.deleteHasRacingSessionRelationship(racingEvent.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)

        await expect(RacingEvent.deleteHasRacingSessionRelationship(-42, racingSession.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and RACING SESSION node do not exist', async () => {
        await expect(RacingEvent.deleteHasRacingSessionRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-racing-session‹ relationship', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        const racingSession = await seedNode(DbNodeType.RacingSession)

        await expect(RacingEvent.deleteHasRacingSessionRelationship(racingEvent.properties.id, racingSession.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-racing-session‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingEvent, DbNodeType.RacingSession, RelationshipType.RacingEventHasRacingSession)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventHasRacingSession,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteHasRacingSessionRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventHasRacingSession,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
