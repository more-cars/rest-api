import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRacingGame} from "../../../fixtures/nodes/FakeRacingGame"

export async function seedRacingGame(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.RacingGame, Object.assign({}, FakeRacingGame.dbInput, customFakeData))
}
