import {expect, test} from 'vitest'
import {FakeRacingGame} from "../../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import {createNode} from "../../../../../../src/db/nodes/racing-games/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeRacingGame.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
