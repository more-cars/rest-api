import {expect, test} from 'vitest'
import {RacingGame} from "../../../../../src/models/racing-games/RacingGame"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Fetching a RACING GAME that does not exist should return "false"', async () => {
    const expectedRacingGame = false
    const actualRacingGame = await RacingGame.findById(-42)

    expect(actualRacingGame)
        .toEqual(expectedRacingGame)
})

test('When the RACING GAME exists it should be returned', async () => {
    const expectedRacingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const actualRacingGame = await RacingGame.findById(expectedRacingGame.id)

    expect(actualRacingGame)
        .toEqual(expectedRacingGame)
})
