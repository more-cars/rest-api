import {createNode} from "../../../../../src/db/node-types/car-model-variants/createNode"
import {FakeCarModelVariant} from "../../../fixtures/nodes/FakeCarModelVariant"

export async function seedCarModelVariant(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeCarModelVariant.dbInput(), customFakeData))
}
