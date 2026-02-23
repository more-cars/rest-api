import {createNode} from "../../../../../src/db/node-types/racing-sessions/createNode"
import {FakeRacingSession} from "../../../fixtures/nodes/FakeRacingSession"

export async function seedRacingSession(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeRacingSession.dbInput(), customFakeData))
}
