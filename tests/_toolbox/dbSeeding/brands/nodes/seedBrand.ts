import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {FakeBrand} from "../../../fixtures/nodes/FakeBrand"

export async function seedBrand(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Brand, Object.assign({}, FakeBrand.dbInput(), customFakeData))
}
