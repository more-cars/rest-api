import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›belongs-to-racing-event‹ relationship', () => {
    test('with valid data', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingSession.id,
            racingEvent.id,
            RelationshipType.RacingSessionBelongsToRacingEvent,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', racingSession.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingSessionBelongsToRacingEvent)
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
            RelationshipType.RacingSessionBelongsToRacingEvent,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
