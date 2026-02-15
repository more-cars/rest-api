import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›belongs-to-race-track‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            raceTrack.id,
            DbRelationship.TrackLayoutBelongsToRaceTrack,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', raceTrack.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.TrackLayoutBelongsToRaceTrack)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            -42,
            DbRelationship.TrackLayoutBelongsToRaceTrack,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
