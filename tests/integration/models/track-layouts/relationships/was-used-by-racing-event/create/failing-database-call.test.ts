import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id))
        .rejects
        .toThrow(Error)
})
