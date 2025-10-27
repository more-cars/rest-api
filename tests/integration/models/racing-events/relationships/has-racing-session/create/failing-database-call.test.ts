import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

    await expect(RacingEvent.createHasRacingSessionRelationship(racingEvent.id, racingSession.id))
        .rejects
        .toThrow(Error)
})
