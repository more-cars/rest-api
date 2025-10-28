import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    await expect(RacingSession.createHasSessionResultRelationship(racingSession.id, sessionResult.id))
        .rejects
        .toThrow(Error)
})
