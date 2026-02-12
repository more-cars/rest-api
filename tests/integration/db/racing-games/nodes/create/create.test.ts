import {describe, expect, test} from 'vitest'
import {FakeRacingGame} from "../../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import {createNode} from "../../../../../../src/db/nodes/racing-games/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingGame.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingGame.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode)
            .toEqual(expect.objectContaining(inputData))
    })
})
