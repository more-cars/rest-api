import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeLapTime} from "../../../fixtures/nodes/FakeLapTime"

export async function seedLapTime(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.LapTime, Object.assign({}, FakeLapTime.dbInput, customFakeData))
}
