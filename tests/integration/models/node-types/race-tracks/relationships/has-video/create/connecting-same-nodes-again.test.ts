import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RaceTrack} from "../../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-video‹ relationship again', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const video = await seedNode(DbNodeType.Video)

    await expect(RaceTrack.createHasVideoRelationship(raceTrack.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RaceTrack.createHasVideoRelationship(raceTrack.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
