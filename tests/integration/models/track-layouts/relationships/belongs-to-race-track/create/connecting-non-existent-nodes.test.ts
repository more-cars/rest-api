import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-race-track‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(-42, raceTrack.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
