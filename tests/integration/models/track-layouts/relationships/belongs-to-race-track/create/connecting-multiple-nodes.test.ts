import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A TRACK LAYOUT cannot have multiple ›belongs-to-race-track‹ relationships', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const raceTracksAmount = 3
    const raceTracks = await seedNodes(NodeTypeEnum.RACE_TRACK, raceTracksAmount)

    for (const raceTrack of raceTracks) {
        await TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.id, raceTrack.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.id,
        RelationshipType.TrackLayoutBelongsToRaceTrack,
        NodeTypeLabel.RaceTrack,
    )

    expect(relationships.length)
        .toBe(1)
})
