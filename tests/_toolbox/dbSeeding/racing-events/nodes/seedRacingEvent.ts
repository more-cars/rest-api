import {createNode} from "../../../../../src/db/node-types/racing-events/createNode"
import {FakeRacingEvent} from "../../../fixtures/nodes/FakeRacingEvent"

export async function seedRacingEvent(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeRacingEvent.dbInput, customFakeData))
}
