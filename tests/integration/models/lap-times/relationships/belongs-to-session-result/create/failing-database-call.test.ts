import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    await expect(LapTime.createBelongsToSessionResultRelationship(lapTime.id, sessionResult.id))
        .rejects
        .toThrow(Error)
})
