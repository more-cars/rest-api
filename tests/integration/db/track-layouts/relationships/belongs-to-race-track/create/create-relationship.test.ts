import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›belongs-to-race-track‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            raceTrack.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', raceTrack.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.TrackLayoutBelongsToRaceTrack)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            -42,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
