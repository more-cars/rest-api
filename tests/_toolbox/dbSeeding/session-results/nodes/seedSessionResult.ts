import {createNode} from "../../../../../src/db/nodes/session-results/createNode"
import {FakeSessionResult} from "../../../fixtures/nodes/FakeSessionResult"

export async function seedSessionResult(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeSessionResult.dbInput(), customFakeData))
}
