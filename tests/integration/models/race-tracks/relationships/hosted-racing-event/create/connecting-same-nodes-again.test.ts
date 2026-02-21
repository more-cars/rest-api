import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›hosted-racing-event‹ relationship again', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RaceTrack)
    const racingEvent = await seedNode(ControllerNodeType.RacingEvent)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.properties.id, racingEvent.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
