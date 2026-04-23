import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeMagazineIssue} from "../../../fixtures/nodes/FakeMagazineIssue"

export async function seedMagazineIssue(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.MagazineIssue, Object.assign({}, FakeMagazineIssue.dbInput, customFakeData))
}
