import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeMagazine} from "../../../fixtures/nodes/FakeMagazine"

export async function seedMagazine(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Magazine, Object.assign({}, FakeMagazine.dbInput, customFakeData))
}
