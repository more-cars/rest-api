import {describe, expect, test} from 'vitest'
import {FakeRacingGame} from "../../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingGame.dbInput()
        const createdNode = await createDbNode(DbNodeType.RacingGame, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingGame.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.RacingGame, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
