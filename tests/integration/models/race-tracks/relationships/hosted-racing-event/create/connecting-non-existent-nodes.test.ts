import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›hosted-racing-event‹ relationship with nodes that do not exist', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RaceTrack.createHostedRacingEventRelationship(-42, racingEvent.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHostedRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
