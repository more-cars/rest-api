import {createNode} from "../../../../../src/db/node-types/magazine-issues/createNode"
import {FakeMagazineIssue} from "../../../fixtures/nodes/FakeMagazineIssue"

export async function seedMagazineIssue(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeMagazineIssue.dbInput, customFakeData))
}
