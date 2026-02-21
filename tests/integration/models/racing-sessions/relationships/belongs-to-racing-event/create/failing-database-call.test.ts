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

    const racingSession = await seedNode(ControllerNodeType.RacingSession)
    const racingEvent = await seedNode(ControllerNodeType.RacingEvent)

    await expect(RacingSession.createBelongsToRacingEventRelationship(racingSession.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(Error)
})
