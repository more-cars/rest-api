import {createNode} from "../../../../../src/db/nodes/track-layouts/createNode"
import FakeTrackLayout from "../../../fixtures/nodes/FakeTrackLayout"

export async function seedTrackLayout(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeTrackLayout, customFakeData))
}
