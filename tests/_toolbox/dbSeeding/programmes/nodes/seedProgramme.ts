import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeProgramme} from "../../../fixtures/nodes/FakeProgramme"

export async function seedProgramme(customFakeData: object = {}) {
    return createDbNode(DbNodeType.Programme, Object.assign({}, FakeProgramme.dbInput, customFakeData))
}
