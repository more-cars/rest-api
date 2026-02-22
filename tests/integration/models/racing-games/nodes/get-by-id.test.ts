import {expect, test} from 'vitest'
import {RacingGame} from "../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

test('Fetching a RACING GAME that does not exist should return "false"', async () => {
    const expectedRacingGame = false
    const actualRacingGame = await RacingGame.findById(-42)

    expect(actualRacingGame)
        .toEqual(expectedRacingGame)
})

test('When the RACING GAME exists it should be returned', async () => {
    const expectedRacingGame = await seedNode(DbNodeType.RacingGame)
    const actualRacingGame = await RacingGame.findById(expectedRacingGame.properties.id)

    expect(actualRacingGame.attributes)
        .toEqual(expectedRacingGame.properties)
})
