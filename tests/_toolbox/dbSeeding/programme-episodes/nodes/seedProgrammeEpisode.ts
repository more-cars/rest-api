import {createNode} from "../../../../../src/db/node-types/programme-episodes/createNode"
import {FakeProgrammeEpisode} from "../../../fixtures/nodes/FakeProgrammeEpisode"

export async function seedProgrammeEpisode(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeProgrammeEpisode.dbInput, customFakeData))
}
