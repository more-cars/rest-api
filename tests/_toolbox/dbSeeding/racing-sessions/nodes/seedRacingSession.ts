import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRacingSession} from "../../../fixtures/nodes/FakeRacingSession"

export async function seedRacingSession(customFakeData: object = {}) {
    return createDbNode(DbNodeType.RacingSession, Object.assign({}, FakeRacingSession.dbInput(), customFakeData))
}
