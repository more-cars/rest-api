import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RaceTrack} from "../../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›hosted-racing-event‹ relationship again', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.properties.id, racingEvent.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
