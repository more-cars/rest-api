import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.id, gamingPlatform.id))
        .rejects
        .toThrow(Error)
})
