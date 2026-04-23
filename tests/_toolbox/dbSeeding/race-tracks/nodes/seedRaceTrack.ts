import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRaceTrack} from "../../../fixtures/nodes/FakeRaceTrack"

export async function seedRaceTrack(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.RaceTrack, Object.assign({}, FakeRaceTrack.dbInput, customFakeData))
}
