import {createNode} from "../../../../../src/db/node-types/brands/createNode"
import {FakeBrand} from "../../../fixtures/nodes/FakeBrand"

export async function seedBrand(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeBrand.dbInput(), customFakeData))
}
