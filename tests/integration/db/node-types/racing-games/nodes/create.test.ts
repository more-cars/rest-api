import {describe, expect, test} from 'vitest'
import {FakeRacingGame} from "../../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingGame.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.RacingGame, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingGame.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.RacingGame, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
