import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-race-track‹ relationship', () => {
    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        await expect(TrackLayout.deleteBelongsToRaceTrackRelationship(trackLayout.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACE TRACK node does not exist', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        await expect(TrackLayout.deleteBelongsToRaceTrackRelationship(-42, raceTrack.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node and RACE TRACK node do not exist', async () => {
        await expect(TrackLayout.deleteBelongsToRaceTrackRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-race-track‹ relationship', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        await expect(TrackLayout.deleteBelongsToRaceTrackRelationship(trackLayout.properties.id, raceTrack.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-race-track‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.TrackLayout, DbNodeType.RaceTrack, RelationshipType.TrackLayoutBelongsToRaceTrack)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await TrackLayout.deleteBelongsToRaceTrackRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
