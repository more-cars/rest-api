import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

    await expect(SessionResult.createHasLapTimeRelationship(sessionResult.id, lapTime.id))
        .rejects
        .toThrow(Error)
})
