import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {FakeBook} from "../../../fixtures/nodes/FakeBook"

export async function seedBook(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Book, Object.assign({}, FakeBook.dbInput(), customFakeData))
}
