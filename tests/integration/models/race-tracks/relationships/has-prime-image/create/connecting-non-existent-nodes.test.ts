import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const image = await seedNode(DbNodeType.Image)

    await expect(RaceTrack.createHasPrimeImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHasPrimeImageRelationship(raceTrack.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
