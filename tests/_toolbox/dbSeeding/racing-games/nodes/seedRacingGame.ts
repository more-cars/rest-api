import {createNode} from "../../../../../src/db/nodes/racing-games/createNode"
import {FakeRacingGame} from "../../../fixtures/nodes/FakeRacingGame"

export async function seedRacingGame(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeRacingGame.dbInput(), customFakeData))
}
