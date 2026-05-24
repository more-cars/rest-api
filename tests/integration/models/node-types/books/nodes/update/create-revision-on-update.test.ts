import {expect, test} from "vitest"
import {Book} from "../../../../../../../src/models/node-types/books/Book"
import {FakeBook} from "../../../../../../_toolbox/fixtures/nodes/FakeBook"
import type {BookInput} from "../../../../../../../src/models/node-types/books/types/BookInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await Book.create(FakeBook.dbInput())
    await Book.update(node.attributes.id, {} as BookInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
