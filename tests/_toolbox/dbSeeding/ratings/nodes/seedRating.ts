import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRating} from "../../../fixtures/nodes/FakeRating"

export async function seedRating(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Rating, Object.assign({}, FakeRating.dbInput, customFakeData))
}
