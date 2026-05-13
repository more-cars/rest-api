import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeImage} from "../../../fixtures/nodes/FakeImage"

export async function seedImage(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Image, Object.assign({}, FakeImage.dbInput(), customFakeData))
}
