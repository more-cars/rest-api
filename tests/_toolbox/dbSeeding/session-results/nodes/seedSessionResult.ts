import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeSessionResult} from "../../../fixtures/nodes/FakeSessionResult"

export async function seedSessionResult(customFakeData: object = {}) {
    return createDbNode(DbNodeType.SessionResult, Object.assign({}, FakeSessionResult.dbInput(), customFakeData))
}
