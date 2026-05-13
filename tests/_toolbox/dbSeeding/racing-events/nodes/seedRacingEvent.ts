import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRacingEvent} from "../../../fixtures/nodes/FakeRacingEvent"

export async function seedRacingEvent(customFakeData: object = {}) {
    return createDbNode(DbNodeType.RacingEvent, Object.assign({}, FakeRacingEvent.dbInput(), customFakeData))
}
