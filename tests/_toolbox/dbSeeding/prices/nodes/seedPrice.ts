import {createNode} from "../../../../../src/db/node-types/prices/createNode"
import {FakePrice} from "../../../fixtures/nodes/FakePrice"

export async function seedPrice(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakePrice.dbInput, customFakeData))
}
