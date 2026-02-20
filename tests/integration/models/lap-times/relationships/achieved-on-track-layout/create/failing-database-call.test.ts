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

    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.properties.id, trackLayout.properties.id))
        .rejects
        .toThrow(Error)
})
