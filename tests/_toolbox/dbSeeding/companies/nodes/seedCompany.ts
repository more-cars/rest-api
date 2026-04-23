import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeCompany} from "../../../fixtures/nodes/FakeCompany"

export async function seedCompany(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Company, Object.assign({}, FakeCompany.dbInput, customFakeData))
}
