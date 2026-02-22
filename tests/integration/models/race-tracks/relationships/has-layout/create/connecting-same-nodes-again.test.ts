import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-layout‹ relationship again', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const trackLayout = await seedNode(DbNodeType.TrackLayout)

    await expect(RaceTrack.createHasLayoutRelationship(raceTrack.properties.id, trackLayout.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RaceTrack.createHasLayoutRelationship(raceTrack.properties.id, trackLayout.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
