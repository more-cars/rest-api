import {createNode} from "../../../../../src/db/node-types/model-cars/createNode"
import {FakeModelCar} from "../../../fixtures/nodes/FakeModelCar"

export async function seedModelCar(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeModelCar.dbInput, customFakeData))
}
