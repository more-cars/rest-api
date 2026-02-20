import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(racingGame.id, trackLayout.id))
        .rejects
        .toThrow(Error)
})
