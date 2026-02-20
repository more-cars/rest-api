import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-racing-session‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            racingSession.id,
            RelationshipType.RacingEventHasRacingSession,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', racingSession.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingEventHasRacingSession)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            -42,
            RelationshipType.RacingEventHasRacingSession,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
