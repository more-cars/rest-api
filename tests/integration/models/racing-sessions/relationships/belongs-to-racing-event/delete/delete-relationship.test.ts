import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-racing-event‹ relationship', () => {
    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)

        await expect(RacingSession.deleteBelongsToRacingEventRelationship(racingSession.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingSession.deleteBelongsToRacingEventRelationship(-42, racingEvent.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node and RACING EVENT node do not exist', async () => {
        await expect(RacingSession.deleteBelongsToRacingEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-racing-event‹ relationship', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingSession.deleteBelongsToRacingEventRelationship(racingSession.properties.id, racingEvent.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-racing-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingSession, DbNodeType.RacingEvent, RelationshipType.RacingSessionBelongsToRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSessionBelongsToRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSession.deleteBelongsToRacingEventRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSessionBelongsToRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
