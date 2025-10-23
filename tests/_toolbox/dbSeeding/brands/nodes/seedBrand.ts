import {createNode} from "../../../../../src/db/nodes/brands/createNode"
import {FakeBrand} from "../../../fixtures/nodes/FakeBrand"

export async function seedBrand(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeBrand.dbInput(), customFakeData))
}
