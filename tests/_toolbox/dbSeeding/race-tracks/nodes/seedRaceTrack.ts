import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRaceTrack} from "../../../fixtures/nodes/FakeRaceTrack"

export async function seedRaceTrack(customFakeData: object = {}) {
    return createDbNode(DbNodeType.RaceTrack, Object.assign({}, FakeRaceTrack.dbInput, customFakeData))
}
