import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRacingGame} from "../../../fixtures/nodes/FakeRacingGame"

export async function seedRacingGame(customFakeData: object = {}) {
    return createDbNode(DbNodeType.RacingGame, Object.assign({}, FakeRacingGame.dbInput, customFakeData))
}
