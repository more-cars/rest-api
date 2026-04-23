import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeModelCar} from "../../../fixtures/nodes/FakeModelCar"

export async function seedModelCar(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.ModelCar, Object.assign({}, FakeModelCar.dbInput, customFakeData))
}
