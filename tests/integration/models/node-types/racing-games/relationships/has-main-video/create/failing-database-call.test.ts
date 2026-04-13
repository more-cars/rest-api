import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const video = await seedNode(DbNodeType.Video)

    await expect(RacingGame.createHasMainVideoRelationship(racingGame.properties.id, video.properties.id))
        .rejects
        .toThrow(Error)
})
