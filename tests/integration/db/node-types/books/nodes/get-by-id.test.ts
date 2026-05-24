import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/books/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {BookSchema} from "../../../../../_toolbox/schemas/db/BookSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a BOOK that does not exist should return "false"', async () => {
    const expectedBookNode = false
    const actualBookNode = await getNodeById(-42)

    expect(actualBookNode)
        .toBe(expectedBookNode)
})

test('Querying an existing BOOK should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.Book)
    const bookNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(bookNode, BookSchema))
        .toBeTruthy()
})
