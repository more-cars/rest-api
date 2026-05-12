import {describe, expect, test} from 'vitest'
import {FakeMagazine} from "../../../../../_toolbox/fixtures/nodes/FakeMagazine"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeMagazine.dbInput
        const createdNode = await createDbNode(DbNodeType.Magazine, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeMagazine.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.Magazine, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
