import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRevision} from "../../../fixtures/nodes/FakeRevision"

export async function seedRevision(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Revision, Object.assign({}, FakeRevision.dbInput, customFakeData))
}
