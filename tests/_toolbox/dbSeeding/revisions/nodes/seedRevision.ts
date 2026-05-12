import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRevision} from "../../../fixtures/nodes/FakeRevision"

export async function seedRevision(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Revision, Object.assign({}, FakeRevision.dbInput, customFakeData))
}
