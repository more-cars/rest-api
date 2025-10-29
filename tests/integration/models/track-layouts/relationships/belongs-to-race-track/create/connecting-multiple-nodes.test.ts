import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A TRACK LAYOUT cannot have multiple ›belongs-to-race-track‹ relationships', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const raceTracksAmount = 3
    const raceTracks = await seedNodes(NodeTypeEnum.RACE_TRACK, raceTracksAmount)

    for (const raceTrack of raceTracks) {
        await TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.id, raceTrack.id)
    }

    const relationships = await getRelationshipCollection(trackLayout.id, DbRelationship.TrackLayoutBelongsToRaceTrack)

    expect(relationships.length)
        .toBe(1)
})
