import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const lapTime = await seedNode(ControllerNodeType.LapTime)
    const sessionResult = await seedNode(ControllerNodeType.SessionResult)

    await expect(LapTime.createBelongsToSessionResultRelationship(lapTime.properties.id, sessionResult.properties.id))
        .rejects
        .toThrow(Error)
})
