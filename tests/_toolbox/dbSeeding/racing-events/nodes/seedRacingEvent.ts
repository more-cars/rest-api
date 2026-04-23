import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRacingEvent} from "../../../fixtures/nodes/FakeRacingEvent"

export async function seedRacingEvent(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.RacingEvent, Object.assign({}, FakeRacingEvent.dbInput, customFakeData))
}
