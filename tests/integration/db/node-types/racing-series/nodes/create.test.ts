import {describe, expect, test} from 'vitest'
import {FakeRacingSeries} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSeries"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingSeries.dbInput
        const createdNode = await createDbNode(DbNodeType.RacingSeries, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingSeries.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.RacingSeries, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
