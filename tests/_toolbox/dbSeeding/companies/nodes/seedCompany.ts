import {createNode} from "../../../../../src/db/node-types/companies/createNode"
import {FakeCompany} from "../../../fixtures/nodes/FakeCompany"

export async function seedCompany(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeCompany.dbInput(), customFakeData))
}
