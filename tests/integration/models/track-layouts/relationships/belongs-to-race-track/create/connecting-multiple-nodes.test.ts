import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A TRACK LAYOUT cannot have multiple ›belongs-to-race-track‹ relationships', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const raceTracksAmount = 3
    const raceTracks = await seedNodes(ControllerNodeType.RACE_TRACK, raceTracksAmount)

    for (const raceTrack of raceTracks) {
        await TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.id, raceTrack.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.id,
        RelationshipType.TrackLayoutBelongsToRaceTrack,
        DbNodeType.RaceTrack,
    )

    expect(relationships.length)
        .toBe(1)
})
