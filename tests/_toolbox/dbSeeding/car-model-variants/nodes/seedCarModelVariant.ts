import {createNode} from "../../../../../src/db/nodes/car-model-variants/createNode"
import {FakeCarModelVariant} from "../../../fixtures/nodes/FakeCarModelVariant"

export async function seedCarModelVariant(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeCarModelVariant.dbInput(), customFakeData))
}
