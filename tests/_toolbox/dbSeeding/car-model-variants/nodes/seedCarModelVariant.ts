import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeCarModelVariant} from "../../../fixtures/nodes/FakeCarModelVariant"

export async function seedCarModelVariant(customFakeData: object = {}) {
    return createDbNode(DbNodeType.CarModelVariant, Object.assign({}, FakeCarModelVariant.dbInput, customFakeData))
}
