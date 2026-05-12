import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeLapTime} from "../../../fixtures/nodes/FakeLapTime"

export async function seedLapTime(customFakeData: object = {}) {
    return createDbNode(DbNodeType.LapTime, Object.assign({}, FakeLapTime.dbInput, customFakeData))
}
