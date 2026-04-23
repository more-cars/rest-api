import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeGamingPlatform} from "../../../fixtures/nodes/FakeGamingPlatform"

export async function seedGamingPlatform(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.GamingPlatform, Object.assign({}, FakeGamingPlatform.dbInput, customFakeData))
}
