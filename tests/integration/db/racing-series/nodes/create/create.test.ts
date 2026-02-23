import {describe, expect, test} from 'vitest'
import {FakeRacingSeries} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSeries"
import {createNode} from "../../../../../../src/db/node-types/racing-series/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingSeries.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingSeries.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
