import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const trackLayout = await seedNode(DbNodeType.TrackLayout)

    await expect(RaceTrack.createHasLayoutRelationship(raceTrack.properties.id, trackLayout.properties.id))
        .rejects
        .toThrow(Error)
})
