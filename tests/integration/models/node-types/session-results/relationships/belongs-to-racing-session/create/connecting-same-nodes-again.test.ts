import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-racing-session‹ relationship again', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const racingSession = await seedNode(DbNodeType.RacingSession)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(sessionResult.properties.id, racingSession.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(SessionResult.createBelongsToRacingSessionRelationship(sessionResult.properties.id, racingSession.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
