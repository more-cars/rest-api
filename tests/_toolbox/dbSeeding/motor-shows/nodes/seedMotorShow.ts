import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeMotorShow} from "../../../fixtures/nodes/FakeMotorShow"

export async function seedMotorShow(customFakeData: object = {}) {
    return createDbNode(DbNodeType.MotorShow, Object.assign({}, FakeMotorShow.dbInput(), customFakeData))
}
