import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeProgrammeEpisode} from "../../../fixtures/nodes/FakeProgrammeEpisode"

export async function seedProgrammeEpisode(customFakeData: object = {}) {
    return createNeo4jNode(DbNodeType.ProgrammeEpisode, Object.assign({}, FakeProgrammeEpisode.dbInput, customFakeData))
}
