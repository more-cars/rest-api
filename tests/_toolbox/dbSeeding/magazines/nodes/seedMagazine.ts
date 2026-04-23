import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeMagazine} from "../../../fixtures/nodes/FakeMagazine"

export async function seedMagazine(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Magazine, Object.assign({}, FakeMagazine.dbInput, customFakeData))
}
