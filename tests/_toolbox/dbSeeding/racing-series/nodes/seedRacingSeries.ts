import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRacingSeries} from "../../../fixtures/nodes/FakeRacingSeries"

export async function seedRacingSeries(customFakeData: object = {}) {
    return createDbNode(DbNodeType.RacingSeries, Object.assign({}, FakeRacingSeries.dbInput(), customFakeData))
}
