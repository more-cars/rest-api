import {describe, expect, test} from 'vitest'
import {FakeBrand} from "../../../../../_toolbox/fixtures/nodes/FakeBrand"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeBrand.dbInput()
        const createdNode = await createDbNode(DbNodeType.Brand, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeBrand.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.Brand, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
