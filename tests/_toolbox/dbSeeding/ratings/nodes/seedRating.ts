import {createNode} from "../../../../../src/db/node-types/ratings/createNode"
import {FakeRating} from "../../../fixtures/nodes/FakeRating"

export async function seedRating(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeRating.dbInput, customFakeData))
}
