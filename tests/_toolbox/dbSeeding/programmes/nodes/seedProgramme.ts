import {createNode} from "../../../../../src/db/node-types/programmes/createNode"
import {FakeProgramme} from "../../../fixtures/nodes/FakeProgramme"

export async function seedProgramme(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeProgramme.dbInput, customFakeData))
}
