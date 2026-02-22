import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-session-result‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const sessionResult = await seedNode(DbNodeType.SessionResult)

    await expect(LapTime.createBelongsToSessionResultRelationship(-42, sessionResult.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createBelongsToSessionResultRelationship(lapTime.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createBelongsToSessionResultRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
