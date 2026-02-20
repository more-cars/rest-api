import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.id, racingEvent.id))
        .rejects
        .toThrow(Error)
})
