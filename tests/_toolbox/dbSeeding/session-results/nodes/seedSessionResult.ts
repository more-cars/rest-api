import {createNode} from "../../../../../src/db/node-types/session-results/createNode"
import {FakeSessionResult} from "../../../fixtures/nodes/FakeSessionResult"

export async function seedSessionResult(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeSessionResult.dbInput, customFakeData))
}
