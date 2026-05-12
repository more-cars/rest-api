import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakePrice} from "../../../fixtures/nodes/FakePrice"

export async function seedPrice(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Price, Object.assign({}, FakePrice.dbInput, customFakeData))
}
