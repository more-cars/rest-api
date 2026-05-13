import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeCompany} from "../../../fixtures/nodes/FakeCompany"

export async function seedCompany(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Company, Object.assign({}, FakeCompany.dbInput(), customFakeData))
}
