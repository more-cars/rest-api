import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGameNode} from "../../../../../src/db/nodes/racing-games/types/RacingGameNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/racing-games/getAllNodesOfType"

test('When there are no RACING GAMES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.RACING_GAME)

    const expectedRacingGames: RacingGameNode[] = []
    const actualRacingGames = await getAllNodesOfType()

    expect(actualRacingGames)
        .toEqual(expectedRacingGames)
})

test('When RACING GAMES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.RACING_GAME)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.RACING_GAME, amount)

    const actualRacingGames = await getAllNodesOfType()

    expect(actualRacingGames.length)
        .toEqual(amount)
})
