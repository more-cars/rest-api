import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-race-track‹ relationship again', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.properties.id, raceTrack.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.properties.id, raceTrack.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
