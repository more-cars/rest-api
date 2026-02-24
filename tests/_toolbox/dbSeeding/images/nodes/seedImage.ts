import {createNode} from "../../../../../src/db/node-types/images/createNode"
import {FakeImage} from "../../../fixtures/nodes/FakeImage"

export async function seedImage(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeImage.dbInput(), customFakeData))
}
