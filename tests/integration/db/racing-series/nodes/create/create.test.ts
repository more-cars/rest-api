import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/racing-series/createNode"
import {FakeRacingSeries} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSeries"

test('Creating node with valid data', async () => {
    const inputData = FakeRacingSeries.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
