import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeTrackLayout} from "../../../fixtures/nodes/FakeTrackLayout"

export async function seedTrackLayout(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.TrackLayout, Object.assign({}, FakeTrackLayout.dbInput, customFakeData))
}
