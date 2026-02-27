import {createNode} from "../../../../../src/db/node-types/magazines/createNode"
import {FakeMagazine} from "../../../fixtures/nodes/FakeMagazine"

export async function seedMagazine(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeMagazine.dbInput, customFakeData))
}
