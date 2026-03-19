import {createNode} from "../../../../../src/db/node-types/model-car-brands/createNode"
import {FakeModelCarBrand} from "../../../fixtures/nodes/FakeModelCarBrand"

export async function seedModelCarBrand(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeModelCarBrand.dbInput, customFakeData))
}
