import {describe, expect, test} from 'vitest'
import {FakeRacingSeries} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSeries"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingSeries.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.RacingSeries, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingSeries.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.RacingSeries, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
