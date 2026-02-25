import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-session-result‹ relationship again', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const sessionResult = await seedNode(DbNodeType.SessionResult)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.properties.id, sessionResult.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.properties.id, sessionResult.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
