import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeVideo} from "../../../fixtures/nodes/FakeVideo"

export async function seedVideo(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Video, Object.assign({}, FakeVideo.dbInput, customFakeData))
}
