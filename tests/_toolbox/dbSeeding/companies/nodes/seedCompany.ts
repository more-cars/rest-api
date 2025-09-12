import {createNode} from "../../../../../src/db/nodes/companies/createNode"
import FakeCompany from "../../../fixtures/nodes/FakeCompany"

export async function seedCompany() {
    return await createNode(FakeCompany)
}
