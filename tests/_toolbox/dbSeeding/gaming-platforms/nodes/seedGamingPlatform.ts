import {createNode} from "../../../../../src/db/node-types/gaming-platforms/createNode"
import {FakeGamingPlatform} from "../../../fixtures/nodes/FakeGamingPlatform"

export async function seedGamingPlatform(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeGamingPlatform.dbInput(), customFakeData))
}
