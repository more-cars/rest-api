import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-lap-time‹ relationship with nodes that do not exist', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const lapTime = await seedNode(DbNodeType.LapTime)

    await expect(SessionResult.createHasLapTimeRelationship(-42, lapTime.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(SessionResult.createHasLapTimeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
