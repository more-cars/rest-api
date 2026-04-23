import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeCarModelVariant} from "../../../fixtures/nodes/FakeCarModelVariant"

export async function seedCarModelVariant(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.CarModelVariant, Object.assign({}, FakeCarModelVariant.dbInput, customFakeData))
}
