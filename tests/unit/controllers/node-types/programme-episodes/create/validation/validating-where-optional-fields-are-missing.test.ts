import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        title: "The Falls Guys",
        season_number: undefined,
        season_episode_number: undefined,
        original_air_date: undefined,
        duration: undefined,
    }

    const result = validateInputData(data, NodeType.ProgrammeEpisode)

    expect(result)
        .toBeTruthy()
})
