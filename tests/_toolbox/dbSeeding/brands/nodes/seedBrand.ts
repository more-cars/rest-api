import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {FakeBrand} from "../../../fixtures/nodes/FakeBrand"

export async function seedBrand(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Brand, Object.assign({}, FakeBrand.dbInput, customFakeData))
}
