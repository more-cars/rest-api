import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeModelCarBrand} from "../../../fixtures/nodes/FakeModelCarBrand"

export async function seedModelCarBrand(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.ModelCarBrand, Object.assign({}, FakeModelCarBrand.dbInput, customFakeData))
}
