import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeCarModel} from "../../../fixtures/nodes/FakeCarModel"

export async function seedCarModel(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.CarModel, Object.assign({}, FakeCarModel.dbInput, customFakeData))
}
