import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

    await expect(GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id))
        .rejects
        .toThrow(Error)
})
