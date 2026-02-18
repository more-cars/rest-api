import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

    await expect(RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEvent.id, raceTrack.id))
        .rejects
        .toThrow(Error)
})
