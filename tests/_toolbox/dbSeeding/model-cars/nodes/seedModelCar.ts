import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeModelCar} from "../../../fixtures/nodes/FakeModelCar"

export async function seedModelCar(customFakeData: object = {}) {
    return createDbNode(DbNodeType.ModelCar, Object.assign({}, FakeModelCar.dbInput, customFakeData))
}
