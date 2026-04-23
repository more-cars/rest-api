import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeRacingSeries} from "../../../fixtures/nodes/FakeRacingSeries"

export async function seedRacingSeries(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.RacingSeries, Object.assign({}, FakeRacingSeries.dbInput, customFakeData))
}
