import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

    await expect(RaceTrack.createHostedRacingEventRelationship(raceTrack.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(Error)
})
