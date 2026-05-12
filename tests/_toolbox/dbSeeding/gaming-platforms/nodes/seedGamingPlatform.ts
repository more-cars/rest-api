import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeGamingPlatform} from "../../../fixtures/nodes/FakeGamingPlatform"

export async function seedGamingPlatform(customFakeData: object = {}) {
    return createDbNode(DbNodeType.GamingPlatform, Object.assign({}, FakeGamingPlatform.dbInput, customFakeData))
}
