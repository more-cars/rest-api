import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeSessionResult} from "../../../fixtures/nodes/FakeSessionResult"

export async function seedSessionResult(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.SessionResult, Object.assign({}, FakeSessionResult.dbInput, customFakeData))
}
