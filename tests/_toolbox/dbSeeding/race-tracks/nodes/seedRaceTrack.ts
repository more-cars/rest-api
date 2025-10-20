import {createNode} from "../../../../../src/db/nodes/race-tracks/createNode"
import FakeRaceTrack from "../../../fixtures/nodes/FakeRaceTrack"

export async function seedRaceTrack(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeRaceTrack, customFakeData))
}
