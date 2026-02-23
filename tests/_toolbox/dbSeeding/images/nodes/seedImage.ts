import {createNode} from "../../../../../src/db/node-types/images/createNode"
import FakeImageFull from "../../../fixtures/nodes/FakeImageFull"

export async function seedImage(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeImageFull, customFakeData))
}
