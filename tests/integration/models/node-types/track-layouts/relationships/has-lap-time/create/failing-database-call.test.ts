import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../../src/models/node-types/track-layouts/TrackLayout"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const lapTime = await seedNode(DbNodeType.LapTime)

    await expect(TrackLayout.createHasLapTimeRelationship(trackLayout.properties.id, lapTime.properties.id))
        .rejects
        .toThrow(Error)
})
