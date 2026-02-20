import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const partner = await seedNode(ControllerNodeType.RACING_EVENT)

    await expect(RacingEvent.createFollowsEventRelationship(racingEvent.properties.id, partner.properties.id))
        .rejects
        .toThrow(Error)
})
