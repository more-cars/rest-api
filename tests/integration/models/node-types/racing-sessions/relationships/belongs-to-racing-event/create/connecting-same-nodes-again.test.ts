import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-racing-event‹ relationship again', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.properties.id, racingEvent.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
