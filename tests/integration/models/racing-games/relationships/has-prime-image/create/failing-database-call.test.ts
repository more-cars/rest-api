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

    const racingGame = await seedNode(ControllerNodeType.RacingGame)
    const image = await seedNode(ControllerNodeType.Image)

    await expect(RacingGame.createHasPrimeImageRelationship(racingGame.properties.id, image.properties.id))
        .rejects
        .toThrow(Error)
})
