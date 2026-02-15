import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›hosted-racing-event‹ relationship', () => {
    test('with valid data', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            racingEvent.id,
            DbRelationship.RaceTrackHostedRacingEvent,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', raceTrack.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.RaceTrackHostedRacingEvent)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            -42,
            DbRelationship.RaceTrackHostedRacingEvent,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
