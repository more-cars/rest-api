import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeMotorShow} from "../../../fixtures/nodes/FakeMotorShow"

export async function seedMotorShow(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.MotorShow, Object.assign({}, FakeMotorShow.dbInput, customFakeData))
}
