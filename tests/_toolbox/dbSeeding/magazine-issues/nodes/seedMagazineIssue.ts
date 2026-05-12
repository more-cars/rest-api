import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeMagazineIssue} from "../../../fixtures/nodes/FakeMagazineIssue"

export async function seedMagazineIssue(customFakeData: object = {}) {
    return createDbNode(DbNodeType.MagazineIssue, Object.assign({}, FakeMagazineIssue.dbInput, customFakeData))
}
