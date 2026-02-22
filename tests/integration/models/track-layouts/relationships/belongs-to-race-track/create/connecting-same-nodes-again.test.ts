import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-race-track‹ relationship again', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const raceTrack = await seedNode(DbNodeType.RaceTrack)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.properties.id, raceTrack.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.properties.id, raceTrack.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
