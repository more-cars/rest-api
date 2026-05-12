import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeTrackLayout} from "../../../fixtures/nodes/FakeTrackLayout"

export async function seedTrackLayout(customFakeData: object = {}) {
    return createDbNode(DbNodeType.TrackLayout, Object.assign({}, FakeTrackLayout.dbInput, customFakeData))
}
