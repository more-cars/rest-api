import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-layout‹ relationship', () => {
    test('with valid data', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            trackLayout.id,
            RelationshipType.RaceTrackHasLayout,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', raceTrack.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RaceTrackHasLayout)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            -42,
            RelationshipType.RaceTrackHasLayout,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
