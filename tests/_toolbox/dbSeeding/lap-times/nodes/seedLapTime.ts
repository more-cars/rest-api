import {createNode} from "../../../../../src/db/node-types/lap-times/createNode"
import {FakeLapTime} from "../../../fixtures/nodes/FakeLapTime"

export async function seedLapTime(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeLapTime.dbInput(), customFakeData))
}
