import {describe, expect, test} from 'vitest'
import {FakeBook} from "../../../../../_toolbox/fixtures/nodes/FakeBook"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeBook.dbInput()
        const createdNode = await createDbNode(DbNodeType.Book, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeBook.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.Book, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
