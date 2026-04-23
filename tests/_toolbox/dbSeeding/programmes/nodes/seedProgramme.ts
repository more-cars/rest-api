import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeProgramme} from "../../../fixtures/nodes/FakeProgramme"

export async function seedProgramme(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.Programme, Object.assign({}, FakeProgramme.dbInput, customFakeData))
}
