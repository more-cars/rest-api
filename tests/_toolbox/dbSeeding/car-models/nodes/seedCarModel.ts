import {createNode} from "../../../../../src/db/nodes/car-models/createNode"
import FakeCarModel from "../../../fixtures/nodes/FakeCarModel"

export async function seedCarModel(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeCarModel, customFakeData))
}
