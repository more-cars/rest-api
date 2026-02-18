import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.id, racingEvent.id))
        .rejects
        .toThrow(Error)
})
