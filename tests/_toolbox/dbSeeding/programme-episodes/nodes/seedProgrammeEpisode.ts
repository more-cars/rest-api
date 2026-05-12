import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeProgrammeEpisode} from "../../../fixtures/nodes/FakeProgrammeEpisode"

export async function seedProgrammeEpisode(customFakeData: object = {}) {
    return createDbNode(DbNodeType.ProgrammeEpisode, Object.assign({}, FakeProgrammeEpisode.dbInput, customFakeData))
}
