import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRacingSession} from "../../../fixtures/nodes/FakeRacingSession"

export async function seedRacingSession(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.RacingSession, Object.assign({}, FakeRacingSession.dbInput, customFakeData))
}
