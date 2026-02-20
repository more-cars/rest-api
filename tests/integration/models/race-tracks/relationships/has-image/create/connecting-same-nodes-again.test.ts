import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(RaceTrack.createHasImageRelationship(raceTrack.id, image.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RaceTrack.createHasImageRelationship(raceTrack.id, image.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
