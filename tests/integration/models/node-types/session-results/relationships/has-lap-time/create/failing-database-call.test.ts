import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../../src/models/node-types/session-results/SessionResult"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const lapTime = await seedNode(DbNodeType.LapTime)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.properties.id, lapTime.properties.id))
        .rejects
        .toThrow(Error)
})
