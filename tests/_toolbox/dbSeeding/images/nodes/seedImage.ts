import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeImage} from "../../../fixtures/nodes/FakeImage"

export async function seedImage(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Image, Object.assign({}, FakeImage.dbInput, customFakeData))
}
