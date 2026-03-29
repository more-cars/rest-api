import {createNode} from "../../../../../src/db/node-types/videos/createNode"
import {FakeVideo} from "../../../fixtures/nodes/FakeVideo"

export async function seedVideo(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeVideo.dbInput, customFakeData))
}
