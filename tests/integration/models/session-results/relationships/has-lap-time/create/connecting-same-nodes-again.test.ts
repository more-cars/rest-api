import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-lap-time‹ relationship again', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const lapTime = await seedNode(DbNodeType.LapTime)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.properties.id, lapTime.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.properties.id, lapTime.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
