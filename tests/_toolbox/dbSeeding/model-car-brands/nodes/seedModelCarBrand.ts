import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeModelCarBrand} from "../../../fixtures/nodes/FakeModelCarBrand"

export async function seedModelCarBrand(customFakeData: object = {}) {
    return createDbNode(DbNodeType.ModelCarBrand, Object.assign({}, FakeModelCarBrand.dbInput, customFakeData))
}
