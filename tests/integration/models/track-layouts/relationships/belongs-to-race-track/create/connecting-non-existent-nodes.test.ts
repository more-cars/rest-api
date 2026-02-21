import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-race-track‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TrackLayout)
    const raceTrack = await seedNode(ControllerNodeType.RaceTrack)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(-42, raceTrack.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
