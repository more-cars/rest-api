import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›hosted-racing-event‹ relationship again', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.id, racingEvent.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.id, racingEvent.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
