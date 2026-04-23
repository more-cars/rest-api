import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRating} from "../../../fixtures/nodes/FakeRating"

export async function seedRating(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Rating, Object.assign({}, FakeRating.dbInput, customFakeData))
}
