import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingGame = await seedNode(DbNodeType.RacingGame)
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

    await expect(RacingGame.createReleasedOnGamingPlatformRelationship(racingGame.properties.id, gamingPlatform.properties.id))
        .rejects
        .toThrow(Error)
})
