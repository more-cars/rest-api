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
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.id, racingSeries.id))
        .rejects
        .toThrow(Error)
})
