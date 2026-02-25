import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RaceTrack} from "../../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const image = await seedNode(DbNodeType.Image)

    await expect(RaceTrack.createHasImageRelationship(raceTrack.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RaceTrack.createHasImageRelationship(raceTrack.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
