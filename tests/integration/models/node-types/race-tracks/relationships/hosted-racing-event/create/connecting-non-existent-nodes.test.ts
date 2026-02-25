import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RaceTrack} from "../../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›hosted-racing-event‹ relationship with nodes that do not exist', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(RaceTrack.createHostedRacingEventRelationship(-42, racingEvent.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHostedRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
