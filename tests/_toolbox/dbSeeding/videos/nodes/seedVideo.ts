import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeVideo} from "../../../fixtures/nodes/FakeVideo"

export async function seedVideo(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Video, Object.assign({}, FakeVideo.dbInput(), customFakeData))
}
