import {createNode} from "../../../../../src/db/node-types/motor-shows/createNode"
import {FakeMotorShow} from "../../../fixtures/nodes/FakeMotorShow"

export async function seedMotorShow(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeMotorShow.dbInput, customFakeData))
}
