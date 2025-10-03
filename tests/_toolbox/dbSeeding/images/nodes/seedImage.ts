import {createNode} from "../../../../../src/db/nodes/images/createNode"
import FakeImageFull from "../../../fixtures/nodes/FakeImageFull"

export async function seedImage(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeImageFull, customFakeData))
}
