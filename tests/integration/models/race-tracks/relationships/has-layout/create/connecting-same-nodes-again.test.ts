import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-layout‹ relationship again', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    await expect(RaceTrack.createHasLayoutRelationship(raceTrack.id, trackLayout.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RaceTrack.createHasLayoutRelationship(raceTrack.id, trackLayout.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
