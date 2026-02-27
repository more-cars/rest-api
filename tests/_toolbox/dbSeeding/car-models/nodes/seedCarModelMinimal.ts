import {createNode} from "../../../../../src/db/node-types/car-models/createNode"
import {FakeCarModel} from "../../../fixtures/nodes/FakeCarModel"

export async function seedCarModelMinimal(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeCarModel.dbInputMinimal, customFakeData))
}
