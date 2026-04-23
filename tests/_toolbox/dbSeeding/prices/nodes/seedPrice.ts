import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakePrice} from "../../../fixtures/nodes/FakePrice"

export async function seedPrice(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Price, Object.assign({}, FakePrice.dbInput, customFakeData))
}
